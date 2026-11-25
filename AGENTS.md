# Repository Guidelines

## Project Structure

ShopLedger is a Node.js and Express app. `server.js` starts the server; `config.js` holds port, shop, tax, inventory, and coupon settings. `routes/` contains API routes, `lib/` contains business logic, `public/` contains the browser UI and assets, and `data/db.json` is the JSON data store. There is currently no test directory.

## Development Commands

- `npm start` — start the app at `http://localhost:3000` (or the configured `PORT`).
- `npm test` — currently exits with “no test specified”; no test suite is configured.

Dependencies are declared in `package.json`. Do not add dependencies for workshop fixes.

## Code and Change Guidelines

Match the existing CommonJS JavaScript style: `require`/`module.exports`, semicolons, and two-space indentation. Keep changes focused on the module related to the task. Before changing behavior, write characterization tests with Node’s built-in `node:test`; name tests that capture existing incorrect behavior `CURRENT BEHAVIOUR`. Use in-memory data for tests. Tests must never read or modify `data/db.json`.

## Testing

There are no repository tests yet. For new Node test files, use `node --test`. First record current behavior, including bugs; then add a test for the intended behavior before implementing a fix. Run the tests after changes.

## Commits and Pull Requests

Recent history uses short, plain descriptions (for example, `invoice page for accountant`). Use a focused summary. For workshop pull requests, branch as `fix/<short-name>`, describe tests first, then cause and fix, include the test result, link the relevant issue, and do not merge the PR.

## Data and Security

Order, customer, and inventory operations write to `data/db.json`. Avoid running state-changing flows against the working data file; use a temporary project copy when reproducing app behavior. `config.js` contains an admin key: do not expose secrets or add credentials to commits.
