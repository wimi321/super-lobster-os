# Super Lobster OS

<p align="center">
  <strong>A terminal-first AI operating system for real workspaces.</strong>
</p>

<p align="center">
  Super Lobster OS blends the channel-native orchestration philosophy of OpenClaw
  with the workspace-native execution feel popularized by coding agents, then
  rebuilds the stack as a clean-room, GitHub-ready platform for serious teams.
</p>

<p align="center">
  <a href="./LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-0f172a?style=for-the-badge"></a>
  <a href="./.github/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/wimi321/super-lobster-os/ci.yml?style=for-the-badge"></a>
  <img alt="Node" src="https://img.shields.io/badge/node-%E2%89%A520-16a34a?style=for-the-badge">
  <img alt="Status" src="https://img.shields.io/badge/status-alpha-f97316?style=for-the-badge">
</p>

## Why this exists

Most assistant products force you to choose between two extremes:

- Channel-native assistants that can reach you anywhere, but know too little about your codebase.
- Coding agents that understand the workspace, but feel trapped inside a single terminal thread.

Super Lobster OS is the bet that the next great developer product should do both:

- Think in terms of missions, not chats.
- Remember the workspace, not just the latest prompt.
- Route work across terminal, GitHub, Slack, and mobile-friendly surfaces.
- Enforce clear execution safety policies before anything destructive happens.

## Product Direction

Super Lobster OS is being built as a clean-room project inspired by:

- OpenClaw's channel-native assistant architecture and operator mindset.
- The terminal-first, workspace-aware workflow style seen in modern coding agents.

This repository does not ship proprietary Claude Code source. Instead, it rebuilds the useful interaction patterns in an original implementation that can be safely published and evolved in public.

## What ships today

- `lobsteros plan` generates a mission plan grounded in the current workspace.
- `lobsteros doctor` inspects workspace readiness and persistent memory state.
- `lobsteros guard` classifies risky commands and blocks obviously destructive ones.
- `lobsteros route` recommends the best execution surface for the next step.
- `lobsteros learn` persists durable team knowledge into workspace memory.
- Persistent workspace memory lives in `.lobsteros/memory.json`.
- Channel routing abstractions model where work should happen next.
- Node-native test coverage runs without external dependencies.

## Vision

```text
                    Super Lobster OS

     Channels                     Mission Control               Workspace

 GitHub / Slack / Terminal  ->  Plan -> Guard -> Route  ->  Files / Git / Memory
                                  |        |      |
                                  |        |      -> channel recommendation
                                  |        -> safety policy
                                  -> workspace-aware execution brief
```

## Quick Start

```bash
git clone https://github.com/wimi321/super-lobster-os.git
cd super-lobster-os
npm test
node src/cli.mjs plan --message "refactor the billing retry worker"
node src/cli.mjs guard --command "git push origin main"
node src/cli.mjs route --target github
node src/cli.mjs learn --note "billing retries depend on redis locks"
node src/cli.mjs doctor
```

## Example Output

```json
{
  "prompt": "refactor the billing retry worker",
  "workspace": {
    "cwd": "/your/project",
    "files": ["README.md"],
    "directories": ["src", "docs", "test"],
    "platform": "darwin",
    "node": "v24.8.0",
    "repoDetected": true
  },
  "plan": {
    "mission": "refactor the billing retry worker",
    "steps": [
      {
        "id": "step-1",
        "title": "Protect behavior first"
      }
    ]
  }
}
```

## Core Principles

1. Workspace over thread.
2. Safety over bravado.
3. Multi-surface by design.
4. Memory that stays useful.
5. Public-by-default engineering quality.

## Architecture

- `src/core/workspace-memory.mjs`: persistent mission memory and learnings.
- `src/core/planner.mjs`: plan generation tuned to workspace shape and task intent.
- `src/core/safety-policy.mjs`: command classification and destructive-action blocking.
- `src/core/channel-router.mjs`: choose the right execution surface for each mission.
- `src/core/mission-control.mjs`: orchestration layer that ties planning, routing, and memory together.
- `src/cli.mjs`: zero-dependency terminal interface.

More detail lives in [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

## Roadmap

- Add real shell execution sandboxes and human approval checkpoints.
- Add GitHub issue, PR, and review workflows.
- Add Slack and Telegram outbound adapters.
- Add skill packs for repo triage, release readiness, and design critique.
- Add TUI dashboards for live mission state.
- Add benchmark suites and evaluation harnesses.

Full roadmap: [docs/ROADMAP.md](./docs/ROADMAP.md)

## Comparison

Super Lobster OS aims to sit in the middle of a gap:

- More workspace-native than messaging-only assistants.
- More channel-native than terminal-only coding agents.
- More publishable than private or proprietary forks.

See [docs/COMPARISON.md](./docs/COMPARISON.md).

## Development

```bash
npm test
npm run demo
```

## Contributing

Contributions are welcome. The best starting points are:

1. Improve mission planning quality.
2. Add adapters for real collaboration surfaces.
3. Strengthen safety policy heuristics.
4. Build evaluation fixtures around realistic team tasks.

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before sending a PR.

## Security

If you find a security issue, please follow [SECURITY.md](./SECURITY.md).

## Notice

Project provenance and clean-room boundaries are documented in [NOTICE.md](./NOTICE.md).

## Credits

- OpenClaw for demonstrating how ambitious a channel-native personal assistant can be.
- The broader coding-agent ecosystem for pushing terminal UX, safety, and workspace intelligence forward.
