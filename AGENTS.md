# Project Agent Instructions

- Keep changes scoped to the requested behavior and follow existing React, Phaser, and TypeScript patterns.
- Use CSS Modules for component styling. Prefer shared CSS variables in `src/global.css`; avoid one-off pixel sizes, color literals, shadows, or inline styles.
- Reuse `IconButton`, `IconLink`, and `PopoverMenu` before adding another control abstraction.
- Add icons as named SVG components in `src/components/icons/`. Do not use Unicode characters or emoji as icon substitutes.
- Never hardcode user-facing or accessible text in components or Phaser scenes. Add keys to both Dutch and English translation resources.
- Keep Phaser-specific color constants in `src/theme/game-colors.ts` and use the translation event bus for visible scene text.
- Run `npm run build-nolog` after changes. Do not start or leave a development server running unless requested.