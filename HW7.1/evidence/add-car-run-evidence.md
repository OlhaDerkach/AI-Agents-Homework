# Run evidence

- Tool: Claude (agent) + Playwright CLI 1.62.1 (instead of Codex extension)
- Command: `npx playwright test tests/add-car.spec.ts --project=chromium`
- Timestamp: `2026-10-05T16:03:44Z`
- Environment: `Linux VM (Ubuntu 22.04) on the student's Windows PC, Node v22.23.2, Playwright Chromium 151.0.7922.34, URL https://qauto.forstudy.space`
- Actual: `✓ 1 [chromium] › tests/add-car.spec.ts:3:5 › guest can add Audi TT to Garage (4.1s) — 1 passed (9.6s), exit 0`

```
Running 1 test using 1 worker

  ✓  1 [chromium] › tests/add-car.spec.ts:3:5 › guest can add Audi TT to Garage (4.1s)

  1 passed (9.6s)
```

| Елемент | Джерело |
|---|---|
| setup | `baseURL` + `httpCredentials` from `playwright.config.ts`; `getByRole('button', { name: 'Guest log in' })` — CLI generate-locator, same as baseline `tests/guest-garage.spec.ts` |
| locator/action | CLI snapshot + generate-locator: `getByRole('button', { name: 'Add car' })`, `getByRole('dialog')`, `getByLabel('Brand')`, `getByLabel('Model')`, `getByRole('spinbutton', { name: 'Mileage' })`, `getByRole('button', { name: 'Add' })` (scoped to the dialog, `exact: true`) |
| assertions | `specs/add-car.md`: Garage URL `/panel\/garage/`, `listitem` with `Audi TT` visible (CLI: `getByRole('listitem')`, `getByText('Audi TT')`); extra: dialog hidden, mileage `12000` (CLI snapshot: spinbutton "12000") |

- FACTS: guest garage starts empty; Audi/TT are preselected in the modal; `Add` is disabled until Mileage is filled; after saving there is exactly one `Audi TT` entry with mileage 12000.
- ASSUMPTIONS: `cases/qauto/requirements/add-car.md` is missing from the project — the contract is `specs/add-car.md` only (confirmed by the student). The mileage check is added beyond the spec.
- RISKS: the run happened in a Linux VM, not native Windows; `retries: 1` in the config — the result is a pass on the first attempt.
- HUMAN CORRECTION: npm ci + browser install done by the student on Windows; network allowlist extended by the student.
- DECISION: `ACCEPT` — accepted by the student on 2026-10-05.
