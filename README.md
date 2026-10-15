# Project Phaser

Based on: https://github.com/phaserjs/template-react-ts
In this repo Phaser 3 is used to add a playable webgame to a React page.

## Project Structure

- `src/components/` contains shared React UI and game controls.
- `src/components/icons/` contains the project's reusable SVG icons.
- `src/theme/` contains theme state, CSS design tokens, and Phaser color tokens.
- `src/utils/` contains Dutch and English translation resources.
- `src/endless_game/` and `src/test_game/` contain the Phaser games and scenes.

The React interface uses CSS Modules and native HTML controls. Shared icon buttons and popover menus live in `src/components/`; avoid adding a component library for routine UI.

## UI Conventions

- Use CSS Modules for component styles and the variables in `src/global.css` for colors, spacing, sizes, and shadows.
- Use `IconButton`, `IconLink`, and `PopoverMenu` for repeated controls. Add vector icons to `src/components/icons/` instead of using text glyphs as icons.
- Put user-visible strings and accessible labels in both `src/utils/dutch-lang.tsx` and `src/utils/english-lang.tsx`.
- Keep Phaser color constants in `src/theme/game-colors.ts`. Send translated game text through the existing translation event flow.
- Prefer `rem` and shared CSS variables over literal pixel dimensions. Phaser's logical canvas coordinates are an exception.

## Available Commands

| Command               | Description                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------- |
| `npm install`         | Install all project dependencies from `package.json`                                         |
| `npm run dev`         | Launch a development server with logging via `log.js` server runs on `http://localhost:8080` |
| `npm run build`       | Create a production build in the `dist` folder with logging via `log.js`                     |
| `npm run dev-nolog`   | Launch a development server without sending anonymous data (skips `log.js`)                  |
| `npm run build-nolog` | Create a production build without sending anonymous data (skips `log.js`)                    |
| `npm run deploy`      | Build the project and publish the `dist` folder to GitHub Pages                              |

## Agent Guidance

See [AGENTS.md](AGENTS.md) for workspace-specific contribution instructions and [SKILLS.md](SKILLS.md) for the available project skill.
