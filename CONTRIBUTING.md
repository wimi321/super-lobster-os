# Contributing

## Ground Rules

- Keep the codebase publishable and clean-room safe.
- Prefer simple interfaces over premature abstraction.
- Ship tests with behavioral changes.
- Document user-facing changes in README or docs when they affect workflows.

## Local Development

```bash
npm test
node src/cli.mjs plan --message "map the repository"
```

## Good First Contributions

- Add a new command policy rule.
- Improve the plan generator for a real workflow.
- Add a new channel recommendation strategy.
- Build fixtures that simulate real team requests.
