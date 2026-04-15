# Lovable Prototype Check

Run this before implementing any UI component or layout change.

## 1. Locate the equivalent component in the Lovable prototype
- Clone or read `mugak1/Dinify-Restaurant-Portal`
- Find the component that corresponds to what you are about to implement
- If no direct equivalent exists, find the closest related component

## 2. Check these specific things against the prototype:
- Overall layout and structure
- Spacing and padding values
- Component hierarchy (what wraps what)
- Colour usage and Tailwind classes
- Interactive states (hover, active, disabled, loading)
- Empty states
- Mobile behaviour if visible in the prototype

## 3. Note any deliberate divergences
- The Angular implementation may intentionally differ from the prototype
  in some cases (e.g. Angular-specific patterns, shared UI components)
- Note these explicitly so they are not treated as bugs

## 4. Confirm shared UI components are used where applicable
- Check `src/app/_shared/ui/` for: badge, button, card, dialog, sheet,
  switch, tabs, toast, tooltip
- Use existing shared components rather than building new ones

## 5. Confirm component pattern is correct
- New components should be standalone and added to `imports` in the module
- Never add a standalone component to `declarations`

Report your findings before writing any code. If the prototype differs
significantly from what was planned, flag it for review before proceeding.
