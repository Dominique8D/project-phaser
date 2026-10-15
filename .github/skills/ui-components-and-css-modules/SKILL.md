---
name: ui-components-and-css-modules
description: "Use when adding or changing React UI, CSS Modules, icons, accessible labels, or reusable controls in this project."
---

# UI Components and CSS Modules

Use this skill for user interface work in Project Phaser.

## Components

- Reuse `IconButton`, `IconLink`, and `PopoverMenu` from `src/components/` for recurring controls and menus.
- Add vector icon components to `src/components/icons/`; do not use text glyphs or emoji as icons.
- Keep components focused and avoid duplicating menu dismissal, button states, and layout rules.

## Styling

- Put component styles in adjacent CSS Modules.
- Reuse color, spacing, size, radius, and shadow variables from `src/global.css`.
- Prefer `rem` and shared tokens over literal `px` values. Keep inline styles out of components unless values are genuinely dynamic.
- Keep Phaser canvas colors in `src/theme/game-colors.ts`.

## Text and Accessibility

- Add every user-facing string and accessible label to both Dutch and English resources in `src/utils/`.
- Use translated labels for `aria-label` and other accessible names; do not hardcode them in JSX.
- Keep decorative SVGs hidden from assistive technology when their parent control already has an accessible name.

## Validation

- Run `npm run build-nolog` after implementation.
- Search the touched UI for literal text, icon glyphs, one-off color values, and pixel dimensions before finishing.