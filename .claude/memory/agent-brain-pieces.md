# Agent Brain Pieces

## Learn Scripts

### auto-learn.py

```python
#!/usr/bin/env python3
"""
auto-learn.py — Local LLM-powered lesson extraction.

Runs every 30 minutes via launchd (dev.brain.auto-learn).
Scans all git repos under the workspace, collects activity since last run,
asks phi4-mini (Ollama, http://localhost:11434) to identify reusable lessons,
then calls learn.py (high confidence) or stage.py (medium confidence).

Requirements: Ollama running locally with phi4-mini pulled.
  brew install ollama && ollama pull phi4-mini

Fails silently if Ollama is not running — never blocks development.
Tracks last-run in .agent/state/auto-learn-last-run.

Usage:
  python3 .agent/tools/auto-learn.py          # normal daemon run
  python3 .agent/tools/auto-learn.py --dry-run  # show what would happen
  python3 .agent/tools/auto-learn.py --force    # ignore last-run, scan 4h back
"""
```

### graduate.py

```python
#!/usr/bin/env python3
"""
Accept a staged candidate. Requires --rationale (rubber-stamping is structurally impossible).

Usage:
  python3 .agent/tools/brain/list_candidates.py   # see pending IDs first
  python3 .agent/tools/brain/graduate.py <id> --rationale "evidence holds, matches project conventions"
"""
```

### learn.py

```python
#!/usr/bin/env python3
"""
Teach the agent a rule. Stages + graduates in one step.

Usage:
  python3 .agent/tools/brain/learn.py "Always serialize timestamps in UTC" --rationale "past cross-region bugs"
  python3 .agent/tools/brain/learn.py "Never inline SQL in FastAPI routes" --rationale "keep db layer clean"
"""
```

### list_candidates.py

```python
#!/usr/bin/env python3
"""
List pending lesson candidates, sorted by priority (highest first), then staged date.

Usage:
  python3 .agent/tools/brain/list_candidates.py
"""
```

### recall.py

```python
#!/usr/bin/env python3
"""
Surface graduated lessons relevant to what you're about to do.

Usage:
  python3 .agent/tools/brain/recall.py "add a created_at column"
  python3 .agent/tools/brain/recall.py "deploy FastAPI service" --top 3
"""
```

### reject.py

```python
#!/usr/bin/env python3
"""
Reject a staged candidate. Preserves full decision history in rejected/.

Usage:
  python3 .agent/tools/brain/reject.py <id> --reason "too specific to this sprint, won't generalize"
"""
```

### reopen.py

```python
#!/usr/bin/env python3
"""
Requeue a previously rejected candidate back to pending review.

Usage:
  python3 .agent/tools/brain/reopen.py <id>
"""
```

### show.py

```python
#!/usr/bin/env python3
"""
Dashboard of the lesson brain state.

Usage:
  python3 .agent/tools/brain/show.py
  python3 .agent/tools/brain/show.py --json
  python3 .agent/tools/brain/show.py --plain  # no color (for CI / piping)
"""
```

### stage.py

```python
#!/usr/bin/env python3
"""
Manually stage a candidate lesson for review without graduating it immediately.
Use this when you're not sure a lesson is worth keeping yet.

Usage:
  python3 .agent/tools/brain/stage.py "Always use connection pooling for FastAPI DB" --source code-review
  python3 .agent/tools/brain/stage.py "Avoid global state in Drupal hooks" --conditions drupal hooks --priority ...
"""
```

## Skills

### reflect

```md
name: reflect
description: End-of-session retrospective. Stage lessons learned, write a dated reflection to .agent/memory/reflections/, and trigger qmd reindex. Run at the end of any significant work session from any tool (Warp, Cursor, Claude Code).

---

# Reflect Protocol

Run at session end before updating STATE.md. Takes ~2 minutes.

## Step 1 — Gather context

Read in order (do not skip):

1. `.agent/state/STATE.md` — what was worked on
2. `git --no-pager log --oneline -20` — what actually changed
3. `git status --short` — capture uncommitted session work
4. Any task files referenced in STATE.md (skim only — no deep reads)

## Step 2 — Identify what’s worth preserving

For each thing that happened this session, apply this filter:

| Signal | Action |
|--------|--------|
| Rule confirmed by evidence (bug fixed, test passed, decision validated) | `python3 .agent/tools/brain/learn.py "<claim>" --rationale "<evidence>" --conditions <tags>` |
| Pattern observed but not yet confirmed | `python3 .agent/tools/brain/stage.py "<claim>" --source reflect` |
| Architectural change or new API contract | Update the relevant `.agent/memory/` file (see memory-write skill) |
| Nothing generalizable | Skip |

Aim for 1–3 items. Do not stage vague or session-specific claims.

## Step 3 — Write reflection file

Create `.agent/memory/reflections/YYYY-MM-DD-<slug>.md` where slug is 2–4 words describing the session.

If `.agent/memory/reflections/` does not exist yet, create it first.

"""markdown
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
...
"""

Keep it under 20 lines. Dense bullets only.

## Step 4 — Reindex and finalize

"""bash
/Users/pgriettne002/Projects/.agent/engine/bin/qmd-reindex.sh
"""

Then update .agent/state/STATE.md session end entry as usual.
```



### conversation-digest

```md
name: conversation-digest
description: >
  Extract valuable knowledge from the current conversation and write it to
  .agent/memory/. Use when user asks to "learn from this", "save what we discussed",
  "digest this conversation", "remember what we just talked about", or similar.

---

# Conversation Digest Protocol

## Step 1 — Inventory the conversation

Read the full conversation history. Build a list of:

- Problems solved
- Decisions made and their rationale
- Patterns or rules that emerged
- Research findings about tools, libraries, APIs
- Non-obvious behaviors, gotchas, traps discovered

If the conversation is very large, start from the available summary and targeted transcript windows, then expand only where details are needed.

## Step 2 — Filter ruthlessly

**KEEP:**

- Architectural decisions with clear rationale
- API contracts, data structures, and config patterns discovered through effort
- Reusable rules confirmed by working code, tests, or explicit decisions
- Tool/library knowledge that took significant effort to surface
- Gotchas and non-obvious behaviors that would waste future time

**DISCARD:**

- Failed attempts and iteration noise
- Questions with obvious answers
- Debugging chatter that produced no lasting insight
- Anything already captured in `.agent/memory/`
  (query qmd `agent-memory` first)
- Session-specific state that doesn't generalise
- Anything the user explicitly marked as temporary or exploratory

## Step 3 — Classify and route

| What it is | Action |
|-----------|--------|
| Confirmed reusable rule (evidence in this conversation) | Run `learn.py` with rationale and conditions |
| Observed pattern, not yet confirmed | Run `stage.py --source conversation-digest` |
| Domain/architectural knowledge | Update existing `.agent/memory/<topic>.md` or create new one |
| Multiple distinct topics | Update multiple memory files, one per domain |

## Step 4 — Write memory files

Follow the `memory-write` skill format exactly:

- YAML frontmatter: `topic`, `last_updated`, `tags`
- Dense bullets, zero prose padding
- Every bullet must stand alone as a searchable fact
- Prefer updating existing files over creating new ones
- Create a new file only if the topic has no home in existing memory

## Step 5 — Reindex and report

"""bash
/Users/pgriiettne002/Projects/.agent/engine/bin/qmd-reindex.sh
"""

Report to the user:

- What was written and where
- What lessons were graduated vs staged
- What was evaluated but discarded (and why)

Keep the report concise — one line per action taken.
```

### memory-write

```md
name: memory-write
description: >
  Write or update .agent/memory/ files when new project knowledge is created.
  Use when an architectural decision is made, a new API contract is established,
  a convention is confirmed, or a pattern emerges that future sessions should know.

---

# Memory Write Protocol

## Before writing

Always query qmd `agent-memory` first to avoid duplicating existing knowledge.

- Reuse and update an existing memory file when the topic already exists.
- Create a new file only when no existing memory topic is a fit.

## Decision tree — where does this knowledge go?

| Type | Action |
|------|--------|
| Architectural decision, API contract, confirmed convention | Update or create a `.agent/memory/` file |
| Reusable rule confirmed by evidence | Use `learn.py` with rationale |
| Uncertain pattern, needs more evidence | Use `stage.py --source <context>` |
| Transient session detail, one-off workaround | Nowhere — do not write |

## Memory file format

Files must be **dense** — bullets over prose, no padding.
qmd chunks these, so every token must carry signal.

"""markdown
topic: <short_identifier>
last_updated: YYYY-MM-DD
tags: [tag1, tag2]

# <Title>

## <Section>
- Bullet point fact
- Another fact
...
"""

## Create vs update

- Prefer updating an existing file over creating a new one
- Create a new file only for a genuinely new domain not covered by any existing file
- Keep file names lowercase-hyphenated matching their topic:
  `block-system.md`, `auth-flow.md`
- Subdirectories: apis/ for endpoint contracts, blocks/ for per-block reference

## Do not write

- Failed attempts or dead-end debugging chatter
- Temporary notes that do not generalize
- Duplicate facts already present in existing memory

## After writing

Run immediately after any write to trigger reindex:

"""bash
/Users/pgriiettne002/Projects/.agent/engine/bin/qmd-reindex.sh
"""

This ensures the next qmd query reflects the new content within seconds.
```

## Agents

### agent-brain-services

```md
topic: agent-brain-services
last_updated: 2026-04-22
tags: [brain, qmd, ollama, launchd, services, search]

# Brain Services

## Overview — 5 launchd daemons (auto-start on login)

| Label | Port | Purpose |
|-------|------|---------|
| `dev.qmd.mcp` | 8181 | MCP search endpoint |
| `dev.qmd.reindex` | - | Re-embeds on git changes |
| `dev.qmd.dashboard` | 8182 | Index health + history |
| `dev.brain.auto-learn` | - | Lesson extraction every 30 min |
| Ollama (brew services) | 11434 | phi4-mini inference |

## qmd (search engine)

- Lives at `.agent/engine/` (was top-level `qmd/`)
- Two collections:
  - `digital-storefront-app` — source code, ~1,369 docs, mask: `**/*.{md,mdx,py,ts,tsx,...}`
  - `agent-memory` — curated knowledge, ~38+ docs, mask: `**/*.{md,jsonl}`
- qmd’s model: `embeddinggemma-300M` — embedding only, NOT generative
- Reindex watcher: launchd WatchPaths on `.git/HEAD` changes
- Config: `.agent/engine/config/project.env` (ports, repo paths, masks)
- Skill symlinked: `~/.agents/skills/search -> .agent/engine/skill/`
- Re-run everything: `.agent/engine/install.sh` (idempotent)
- Re-register collections: `.agent/engine/setup-memory.sh`
- Restart MCP: `launchctl kickstart -k gui/$(id -u)/dev.qmd.mcp`

## Ollama (generative LLM)

- Model: `phi4-mini` — Microsoft, ~2.5 GB disk, ~3 GB RAM during inference
- Policy-safe: Microsoft model, all-MS company (Azure, Teams)
- `keep_alive: 0` in every API call — model unloads immediately after response
- RAM profile: ~3 GB peak for ~10–20 seconds, 0 GB idle
- API: `http://localhost:11434/api/chat`
- Start: `brew services start ollama`
- Pull model: `ollama pull phi4-mini`
- Do NOT use: Qwen (Chinese/Alibaba), Gemma 4 E4B (9.6 GB, too heavy)

## auto-learn daemon

- Trigger: every 1800 seconds (30 min), `StartInterval` in plist
- Does NOT run at load (`RunAtLoad: false`)
- Scans all git repos up to 2 levels deep under `~/Projects/`
- Tracks last-run in `.agent/state/auto-learn-last-run`
- Exits silently if Ollama not running (never blocks)
- Logs: `.agent/state/auto-learn.log` + `~/Library/Logs/brain-auto-learn.err.log`
- Manual test: `python3 .agent/tools/auto-learn.py --dry-run`
- Force scan: `python3 .agent/tools/auto-learn.py --force`

## post-commit hook

- Source: `.agent/hooks/git/post-commit` (committed to repo)
- Target: `.git/hooks/post-commit` (symlinked by install.sh)
- Purpose: writes `.agent/state/pending-analysis.md` with commit context
- Agent processes the file at next session start, then deletes it
- No API call, no LLM — pure shell file write

## Engine management

```bash
# Re-run full engine setup after any config change
.agent/engine/install.sh

# Re-register qmd collections + re-embed
.agent/engine/setup-memory.sh

# Watch reindex activity
tail -f .agent/engine/logs/qmd-reindex.log

# Manual reindex
.agent/engine/bin/qmd-reindex.sh
```

### agent-brain-tools-skills-agents

```md
topic: agent-brain-tools-skills-agents
last_updated: 2026-04-22
tags: [brain, tools, skills, agents, lesson, memory]

# Brain Tools, Skills, and Agents

## Lesson lifecycle tools (`.agent/tools/brain/`)

All Python, stdlib only, no pip. ROOT resolves to `.agent/` (3 levels up from script).

| Tool | Purpose |
|------|---------|
| `learn.py "<claim>" --rationale "<why>"` | Graduate a confirmed rule immediately. Idempotent (pattern_id dedup). |
| `stage.py "<claim>" --source <source>` | Stage an uncertain pattern for human review |
| `recall.py "<task>"` | Jaccard lexical search over graduated lessons. Run before high-risk work. |
| `graduate.py <id> --rationale "<why>"` | Accept a staged candidate. `--rationale` required (no rubber-stamping). |
| `reject.py <id> --reason "<why>"` | Reject with reason. Preserves decision history in `memory/lessons/rejected/` |
| `reopen.py <id>` | Requeue a rejected candidate |
| `list_candidates.py` | List pending candidates sorted by priority |
| `show.py` | Dashboard: graduated count, pending, rejected, last graduated |

## Lesson data

- `memory/lessons/lessons.jsonl` — source of truth (structured JSONL)
- `memory/lessons/LESSONS.md` — rendered human-readable view (auto-updated)
- `memory/lessons/candidates/` — gitignored, pending review
- `memory/lessons/rejected/` — gitignored, decision history

## Lesson confidence routing

- `high` → `learn.py` — graduates immediately (confirmed by evidence)
- `medium` → `stage.py` — queued for human `graduate.py --rationale`
- `low` → skip entirely

## auto-learn tool (`.agent/tools/auto-learn.py`)

- Called by launchd every 30 min (see `services.md`)
- Reads workspace git activity since last run
- Calls Ollama phi4-mini to extract 0–3 lessons
- Dispatches to `learn.py` or `stage.py` based on confidence
- `--dry-run` flag: shows what would happen without writing
- `--force` flag: ignores last-run, scans last 4 hours

## Skills

| Skill | Trigger | What it does |
|-------|--------|--------------|
| `reflect` | Session end | Reads STATE.md + git log, stages lessons, writes reflection to `memory/reflections/` |
| `memory-write` | During work, when decision made | Protocol for writing to `memory/` — format, routing, when to create vs update |
| `conversation-digest` | "learn from this", "digest this session" | Deep extraction from full conversation history → memory files + lessons |
| `appkit` | AppKit4 component usage | AppKit4 component reference |
| `commhub-dev` | CommHub module work | CommHub development patterns |
| `block-system` | Block implementation | Block system reference |
| `authoring` | Creating/updating skills or agents | Dispatches to create.md / iterate.md etc. |

## Agents

| Agent | Trigger | Role |
|-------|--------|------|
| `memory-steward` | "review memory", "curate lessons", "audit agent memory" | Periodic curation: graduate/reject queue, stale file audit, contradiction detection |
| `conversation-digest` | "learn from this conversation", "save what we just built" | Deep conversation extraction + clean memory (uses conversation-digest skill) |
| `frontend-architect` | `frontend/src/**`, React, routing, SCSS | Frontend domain |
| `drupal-engineer` | Drupal PHP, controllers, routing | Drupal domain |
| `data-integrator` | SQL, FastAPI CMS, DB schema | Data layer domain |

## Memory write rules (from memory-write skill)

- YAML frontmatter: `topic`, `last_updated`, `tags`
- Dense bullets, zero prose
- Prefer updating existing files over creating new ones
- After any write: run `.agent/engine/bin/qmd-reindex.sh`
- Domain separation: project knowledge in `memory/`, brain knowledge in `memory/brain/`
```

### agent-brain-architecture

```md
topic: agent-brain-architecture
last_updated: 2026-04-22
tags: [brain, architecture, agent, memory, tool-agnostic]

# Agent Brain Architecture

## Why it exists

- `.claude/` locks all knowledge to Claude Code — switching tools loses all context
- `.agent/` is tool-agnostic: Cursor, Claude Code, and any future tool read from it
- `.claude/` reduced to 3 files: `settings.json`, `settings.local.json`, `REDIRECT.md`

## Folder structure

- `AGENTS.md` — master index, session entry point (~500 tokens, pure navigation)
- `memory/` — writable knowledge store, qmd indexes it (never loaded directly)
- `memory/brain/` — AI infrastructure knowledge (this domain)
- `skills/` — loaded on-demand when trigger phrase matches
- `agents/` — role files loaded only when spawned
- `rules/` — loaded only when task domain requires it
- `state/` — `STATE.md` (~300 tokens) + task manager
- `tools/brain/` — lesson lifecycle Python scripts (stdlib only, no pip)
- `tools/auto-learn.py` — LLM-powered lesson extraction daemon
- `hooks/git/` — post-commit hook, symlinked to `.git/hooks/post-commit`
- `engine/` — qmd search service (was top-level `qmd/` folder)

## Session start cost

- Always loaded: `AGENTS.md` + `STATE.md` = ~600 tokens total
- Everything else: fetched on demand via the qmd MCP `query` tool
- Skills and agents never pre-loaded — only when trigger matches
- Memory files never opened directly — only via qmd search snippets

## Tool entry points

- Claude Code: `CLAUDE.md` at project root → reads `.agent/AGENTS.md`
- Cursor: `.cursor/rules/project.mdc` (alwaysApply: true) → `.agent/AGENTS.md`
- Warp/Oz: qmd MCP + skills via `~/.agents/skills/`

## Session protocol (all tools)

1. Read `AGENTS.md` + `STATE.md`
2. Check `state/pending-analysis.md` — if exists, process and delete
3. Query qmd `agent-memory` for task-relevant context
4. Verify code against `rules/` before proposing changes
5. Reflect at session end → `reflect` skill
6. Update `STATE.md`
```

### conversation-digest

```md
name: conversation-digest
trigger: "learn from this conversation", "save this to memory", "digest this session", "what did we learn", "extract knowledge", "remember what we discussed", "save what we just built"
skill: .agent/skills/conversation-digest/SKILL.md

---

# Conversation Digest Agent

## Role

Extracts lasting knowledge from AI conversation history and writes it cleanly to `.agent/memory/`. Acts as the quality gate — only what genuinely benefits future sessions gets written.

## Protocol

Follow `.agent/skills/conversation-digest/SKILL.md` exactly.

## Principles

**Be ruthless about quality.** One precise lesson beats five vague ones. If you are unsure whether something is worth keeping, stage it rather than graduate it, and explain why you were uncertain.

**Check before writing.** Before creating any memory entry, query qmd `agent-memory` to confirm the knowledge doesn't already exist. Duplicate memory degrades search quality.

**Justify every write.** Every memory bullet and every graduated lesson must trace back to specific evidence in the conversation. "We saw this pattern three times in the session" is evidence. "This seems useful" is not.

**Separate concerns.** Don't stuff unrelated knowledge into one memory file. One file per domain. One lesson per claim.

**Preserve the user's intent.** If the user said "remember X specifically", honour that. If they said "learn from this", apply the full filter — don't blindly save everything.

## What this agent does NOT do

- Does not graduate lessons without concrete evidence from the conversation
- Does not create memory files for things the user already knows how to find
- Does not write prose — only dense bullets
- Does not modify `.agent/rules/`, `.agent/skills/`, or `.agent/agents/`
```

### memory-steward

```md
name: memory-steward
description: Deliberate memory curation agent. Spawn for periodic audits, lesson queue reviews, and pruning stale knowledge. Not needed for day-to-day work — the reflect skill handles that.
trigger: "review memory", "curate lessons", "audit agent memory", "clean up stale knowledge", "review lesson queue"

---

# Memory Steward

## Responsibilities

### 1. Review lesson queue

"""bash
python3 .agent/tools/brain/list_candidates.py
"""

For each candidate: evaluate the claim against current memory and codebase context.

- Generalizable and confirmed → graduate.py <id> --rationale "<evidence>"
-- Too specific or not useful → reject.py <id> --reason "<reason>"

### 2. Audit memory files for staleness

- Query qmd using the MCP query tool with collections: ["agent-memory"] for each domain
- Cross-reference against recent git log and current source files
- If a memory file contradicts reality → update it (follow memory-write skill)
- If a section is obsolete → remove it, note the removal with a comment

### 3. Flag contradictions
- If a graduated lesson conflicts with a memory file → surface the conflict, do not silently resolve it
- Present both to the user for a decision before changing either

### 4. Dashboard

"""bash
python3 .agent/tools/brain/show.py
"""

### What this agent does NOT do
- Does not graduate lessons without explicit --rationale
- Does not delete memory files without user confirmation
- Does not modify .agent/rules/ or .agent/skills/
```