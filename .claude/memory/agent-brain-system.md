# Agent Brain System Documentation

This document consolidates the `.agent` architecture, memory system, skills, agents, services, and learning flow.

---

# 1. System Overview

The Agent Brain is a local, tool-agnostic AI operating layer. It keeps durable project knowledge, reusable lessons, skills, agents, state, and search infrastructure outside any single AI tool.

Instead of locking context inside `.claude/`, `.cursor/`, or Warp-specific configuration, every tool points to `.agent/` as the shared source of truth.

```text
Claude Code ──► CLAUDE.md ──► .agent/AGENTS.md
Cursor      ──► .cursor/rules/project.mdc ──► .agent/AGENTS.md
Warp / Oz   ──► qmd MCP + ~/.agents/skills/ ──► .agent/
```

Core goals:

* Keep startup context small.
* Load only relevant knowledge on demand.
* Preserve useful lessons from work sessions.
* Avoid duplicating memory.
* Make memory searchable through qmd.
* Keep the system usable from Claude Code, Cursor, Warp, and future tools.

---

# 2. Architecture

## Why it exists

* `.claude/` locks all knowledge to Claude Code. Switching tools loses all context.
* `.agent/` is tool-agnostic. Cursor, Claude Code, Warp, and future tools can all read from it.
* `.claude/` is reduced to three files: `settings.json`, `settings.local.json`, and `REDIRECT.md`.

## Folder structure

```text
.agent/
├─ AGENTS.md
├─ memory/
│  ├─ brain/
│  ├─ lessons/
│  │  ├─ lessons.jsonl
│  │  ├─ LESSONS.md
│  │  ├─ candidates/
│  │  └─ rejected/
│  └─ reflections/
├─ skills/
├─ agents/
├─ rules/
├─ state/
│  ├─ STATE.md
│  └─ pending-analysis.md
├─ tools/
│  ├─ brain/
│  └─ auto-learn.py
├─ hooks/
│  └─ git/
└─ engine/
```

## Folder responsibilities

* `AGENTS.md` — master index and session entry point.
* `memory/` — writable knowledge store indexed by qmd.
* `memory/brain/` — AI infrastructure knowledge.
* `skills/` — on-demand procedural playbooks.
* `agents/` — role files loaded only when spawned.
* `rules/` — task-domain rules loaded only when required.
* `state/` — session state and task manager.
* `tools/brain/` — lesson lifecycle Python scripts.
* `tools/auto-learn.py` — LLM-powered lesson extraction daemon.
* `hooks/git/` — post-commit hook source.
* `engine/` — qmd search service.

## Session protocol

```text
1. Read .agent/AGENTS.md + .agent/state/STATE.md
2. Check .agent/state/pending-analysis.md
3. Query qmd agent-memory for task-relevant context
4. Verify code against .agent/rules/ before proposing changes
5. Do the work
6. Capture reusable knowledge
7. Reindex qmd
8. Update STATE.md
```

---

# 3. High-Level Flow

```text
User / Tool Session
        │
        ▼
Read .agent/AGENTS.md + .agent/state/STATE.md
        │
        ▼
Check .agent/state/pending-analysis.md
        │
        ├─ If present: process commit context, then delete
        │
        ▼
Query qmd agent-memory for task-relevant knowledge
        │
        ▼
Load only needed skills / agents / rules on demand
        │
        ▼
Do the work
        │
        ▼
Capture reusable knowledge
        │
        ├─ Confirmed rule → learn.py
        ├─ Uncertain pattern → stage.py
        ├─ Architecture/API/project knowledge → memory-write
        └─ Nothing generalizable → skip
        │
        ▼
Reindex qmd
        │
        ▼
Update STATE.md
```

---

# 4. Memory Layer

Memory files store durable project and system knowledge.

```text
.agent/memory/
├─ project/domain knowledge
├─ brain/ infrastructure knowledge
├─ lessons/
│  ├─ lessons.jsonl
│  ├─ LESSONS.md
│  ├─ candidates/
│  └─ rejected/
└─ reflections/
```

## Memory write rules

* Always query qmd `agent-memory` before writing.
* Reuse and update existing memory files when possible.
* Create a new memory file only for a genuinely new topic.
* Use dense bullets, not prose padding.
* Every bullet must stand alone as a searchable fact.
* Reindex after every write.

## Memory file format

```markdown
---
topic: <short_identifier>
last_updated: YYYY-MM-DD
tags: [tag1, tag2]
---

# <Title>

## <Section>
- Bullet point fact
- Another fact
```

---

# 5. Lesson Lifecycle

Lessons are reusable rules extracted from work sessions.

## Lesson data

* `memory/lessons/lessons.jsonl` — source of truth.
* `memory/lessons/LESSONS.md` — rendered human-readable view.
* `memory/lessons/candidates/` — pending review.
* `memory/lessons/rejected/` — rejected lesson history.

## Confidence routing

```text
high   → learn.py  → graduate immediately
medium → stage.py  → queue for human review
low    → skip
```

## Lesson tools

| Tool                                     | Purpose                                         |
| ---------------------------------------- | ----------------------------------------------- |
| `learn.py "<claim>" --rationale "<why>"` | Graduate a confirmed rule immediately.          |
| `stage.py "<claim>" --source <source>`   | Stage an uncertain pattern for review.          |
| `recall.py "<task>"`                     | Search graduated lessons before high-risk work. |
| `graduate.py <id> --rationale "<why>"`   | Accept a staged candidate.                      |
| `reject.py <id> --reason "<why>"`        | Reject with reason and preserve history.        |
| `reopen.py <id>`                         | Requeue a rejected candidate.                   |
| `list_candidates.py`                     | List pending candidates by priority.            |
| `show.py`                                | Show lesson dashboard.                          |

---

# 6. Brain Services

## Launchd daemons

| Label                  | Port  | Purpose                            |
| ---------------------- | ----- | ---------------------------------- |
| `dev.qmd.mcp`          | 8181  | MCP search endpoint                |
| `dev.qmd.reindex`      | -     | Re-embeds on git changes           |
| `dev.qmd.dashboard`    | 8182  | Index health and history           |
| `dev.brain.auto-learn` | -     | Lesson extraction every 30 minutes |
| Ollama                 | 11434 | phi4-mini inference                |

## qmd search engine

* Lives at `.agent/engine/`.
* Uses `embeddinggemma-300M` for embeddings only.
* Indexes project code and curated agent memory.
* Reindexes on git changes.
* Config lives at `.agent/engine/config/project.env`.

Common commands:

```bash
.agent/engine/install.sh
.agent/engine/setup-memory.sh
.agent/engine/bin/qmd-reindex.sh
tail -f .agent/engine/logs/qmd-reindex.log
launchctl kickstart -k gui/$(id -u)/dev.qmd.mcp
```

## Ollama

* Model: `phi4-mini`.
* Microsoft model.
* Around 2.5 GB disk.
* Around 3 GB RAM during inference.
* `keep_alive: 0` unloads the model after each response.
* API: `http://localhost:11434/api/chat`.

Commands:

```bash
brew services start ollama
ollama pull phi4-mini
```

## Auto-learn daemon

* Runs every 1800 seconds.
* Does not run at load.
* Scans git repos up to two levels deep under `~/Projects/`.
* Tracks last run in `.agent/state/auto-learn-last-run`.
* Exits silently if Ollama is not running.

Commands:

```bash
python3 .agent/tools/auto-learn.py --dry-run
python3 .agent/tools/auto-learn.py --force
```

---

# 7. Skills

## reflect

End-of-session retrospective. Stages lessons, writes a dated reflection, and triggers qmd reindex.

Trigger: end of significant work session.

Main flow:

```text
1. Read STATE.md
2. Read recent git log
3. Read git status
4. Identify useful lessons
5. Write reflection file
6. Reindex qmd
7. Update STATE.md
```

Reflection file format:

```markdown
---
date: YYYY-MM-DD
session: <slug>
tags: [tag1, tag2]
---

# <Session Title>

## What changed
- <bullet>

## Decisions made
- <bullet>

## Lessons staged
- <claim> → staged/graduated
```

## conversation-digest

Extracts valuable knowledge from the current conversation and writes it to `.agent/memory/`.

Use when the user says:

* "learn from this"
* "save what we discussed"
* "digest this conversation"
* "remember what we just talked about"

Flow:

```text
1. Inventory the conversation
2. Filter ruthlessly
3. Classify and route
4. Write memory files
5. Reindex and report
```

Keep:

* Architectural decisions.
* API contracts.
* Confirmed reusable rules.
* Tool/library discoveries.
* Non-obvious gotchas.

Discard:

* Failed attempts.
* Obvious answers.
* Debugging chatter with no lasting insight.
* Duplicate memory.
* Temporary session state.

## memory-write

Protocol for writing `.agent/memory/` files.

Use when:

* An architectural decision is made.
* A new API contract is established.
* A convention is confirmed.
* A reusable pattern emerges.

Decision tree:

| Type                                   | Action                                 |
| -------------------------------------- | -------------------------------------- |
| Architectural decision or API contract | Update or create `.agent/memory/` file |
| Reusable rule confirmed by evidence    | Use `learn.py`                         |
| Uncertain pattern                      | Use `stage.py --source <context>`      |
| Transient detail                       | Do not write                           |

## commit

Quick commit skill.

Flow:

```text
1. Check staged files
2. Review cached diff
3. Write conventional commit message
4. Commit
5. Report commit hash
```

Rules:

* Do not run `git add` automatically.
* Never add `Co-Authored-By`.
* Never add AI/Warp attribution.

## commitpush

Commit staged changes, push to remote, and create a GitHub PR.

Flow:

```text
1. Check staged files
2. Determine target branch
3. Review cached diff
4. Write commit message
5. Check existing commits
6. Commit
7. Push
8. Open PR
9. Report PR URL
```

Base branch rules:

* `hotfix/*` → `develop`
* `feature/*` → `develop`
* `release/*` → `main`
* Otherwise ask user.

---

# 8. Agents

## conversation-digest agent

Extracts lasting knowledge from AI conversation history and writes it cleanly to `.agent/memory/`.

Principles:

* Be ruthless about quality.
* Check before writing.
* Justify every write.
* Separate concerns.
* Preserve the user’s intent.

Does not:

* Graduate lessons without evidence.
* Create memory files for things already easy to find.
* Write prose-heavy memory.
* Modify `.agent/rules/`, `.agent/skills/`, or `.agent/agents/`.

## memory-steward agent

Deliberate memory curation agent.

Use for:

* Periodic memory audits.
* Lesson queue reviews.
* Pruning stale knowledge.
* Contradiction detection.

Responsibilities:

```text
1. Review lesson queue
2. Audit memory files for staleness
3. Flag contradictions
4. Run dashboard
```

Does not:

* Graduate lessons without explicit rationale.
* Delete memory files without user confirmation.
* Modify `.agent/rules/` or `.agent/skills/`.

---

# 9. Automation and Learning Loop

```text
Work session
   │
   ├─ post-commit hook writes pending-analysis.md
   │
   ├─ auto-learn scans git activity every 30 minutes
   │
   ├─ reflect runs at session end
   │
   └─ conversation-digest runs when user asks to preserve conversation knowledge
        │
        ▼
learn.py / stage.py / memory-write
        │
        ▼
qmd-reindex.sh
        │
        ▼
Future sessions retrieve the knowledge through qmd
```

---

# 10. Governance Rules

* Do not load everything by default.
* Do not duplicate memory.
* Query qmd first.
* Do not graduate lessons without evidence.
* Do not write vague or session-specific memory.
* Prefer updating existing memory files over creating new files.
* Keep project knowledge in `.agent/memory/`.
* Keep brain infrastructure knowledge in `.agent/memory/brain/`.
* Reindex after every memory write.
* Preserve decision history for rejected lessons.
* Surface contradictions instead of silently resolving them.
