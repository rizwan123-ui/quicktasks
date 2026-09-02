# NOTES.md — Accessible Component Fundamentals

## Comparison: My components vs shadcn/ui (Base UI primitives)

After building Modal, Tabs, and Disclosure by hand and then installing shadcn/ui's `dialog` and `tabs` (built on `@base-ui/react`), here are the concrete gaps I found between my implementation and theirs.

### 1. Portal rendering (Dialog)

shadcn's `DialogContent` wraps everything in `DialogPrimitive.Portal`, which renders the dialog's DOM outside the normal component tree (usually appended near `document.body`). My `Modal` renders inline exactly where it's called in the JSX tree.

**Why this matters:** if a parent container anywhere up the tree has `overflow: hidden`, a lower `z-index`, or a CSS transform (which creates a new stacking context), my modal could get visually clipped or trapped behind other elements. A portal sidesteps this entirely since the dialog is not a DOM descendant of any component that might clip it. I missed this because my modal worked fine in my simple test page, but it's not guaranteed to work once dropped into a more complex page layout.

### 2. Automatic ID wiring for `aria-labelledby` / `aria-describedby`

I hardcoded `id="modal-title"` on my heading and pointed `aria-labelledby="modal-title"` at it directly. shadcn's `DialogTitle` and `DialogDescription` don't take an explicit `id` prop at all — Base UI generates a unique ID internally and wires up `aria-labelledby`/`aria-describedby` on the dialog automatically through React context.

**Why this matters:** my hardcoded ID approach breaks the moment two `Modal` instances exist on the same page at once (duplicate `id` values are invalid HTML and screen readers get confused about which title belongs to which dialog). Base UI's per-instance generated IDs avoid that collision entirely. I didn't think about this because my demo page only ever renders one modal.

### 3. Exit animation lifecycle (Dialog)

My modal does `if (!isOpen) return null`, so it unmounts immediately the instant `isOpen` becomes false. shadcn's dialog uses `data-open` / `data-closed` attributes with `animate-in` / `animate-out` classes, meaning Base UI keeps the dialog mounted just long enough for the closing transition to finish before removing it from the DOM.

**Why this matters:** an abrupt unmount can be jarring for sighted users and can also cause focus to jump unpredictably if the closing element is removed mid-transition. It's a smaller accessibility point than the first two, but it shows Base UI treats close as a timed process, not an instant toggle.

### 4. Orientation-aware keyboard handling (Tabs)

My `Tabs` component only listens for `ArrowLeft` / `ArrowRight`, which is correct for the horizontal case but would be wrong for a vertical tab list (where the APG pattern calls for `ArrowUp` / `ArrowDown` instead). shadcn's `Tabs` root accepts an `orientation` prop (`horizontal` | `vertical`) and the underlying Base UI primitive adjusts which arrow keys move focus based on that setting.

**Why this matters:** I only implemented the one orientation I needed for my test page, but the ARIA APG pattern explicitly requires different arrow keys depending on orientation. My component would silently fail the keyboard requirement if reused in a vertical layout without changes.

## Summary

Building these three components from scratch by hand, then reading Base UI's source, made it clear that the roles, `aria-*` attributes, and keyboard behavior I implemented were correct for the basic case — but a lot of the *robustness* (portals, ID collision safety, animation-aware unmounting, orientation handling) only shows up when you think about the component being reused in less controlled conditions than a single demo page. That's the part shadcn/Base UI handles that I didn't.