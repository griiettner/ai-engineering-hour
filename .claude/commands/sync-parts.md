Check visual and structural consistency across all `partN.html` files in this project.

## What to compare

Read all existing part files and identify inconsistencies in:

**1. Navigation pattern**
- All parts should use `nav-group-label` divs to group nav items
- Active state: `border-left: 4px solid <accent-color>` + `background-color: stone-200`

**2. Step card style**
- Should be: `flex gap-4 p-5 bg-white rounded-2xl border border-stone-200 shadow-sm`
- Step badge: `.step-number` class — circular, accent background, white bold text
- Parts still using old `timeline-item::before` CSS pseudo-element need updating

**3. Copy buttons**
- Must use `navigator.clipboard.writeText()` — not `document.execCommand` or simulated-only

**4. Code block colors**
- Dark background `bg-stone-900` / `#1c1917`
- violet = keys/property names, emerald = string values, blue = sub-properties, orange = booleans

**5. Header pattern**
- `sticky top-0 z-20`, `bg-white border-b border-stone-200 shadow-sm`
- Left: emoji + "Engineering Hour P{N}" with accent color on PN
- Right: module subtitle (hidden on mobile)

**6. Closing section**
- Every part should end with a "Próximos Passos" section
- Every part should have a closing mantra/quote in dark card style

## Output
A table listing each part file, what's consistent ✅, and what needs fixing ⚠️.
Then a prioritized fix list for the most impactful inconsistencies to address first.
