<div align="center">
  <img src="./docs/assets/lobster-hero.svg" alt="Super Lobster OS hero" width="100%">
</div>

<h1 align="center">Super Lobster OS</h1>

<p align="center">
  <strong>A terminal-first AI operating system for real developer missions.</strong>
</p>

<p align="center">
  Super Lobster OS is a clean-room project that fuses two powerful ideas into one public, extensible platform:<br>
  <strong>channel-native orchestration</strong> and <strong>workspace-native execution</strong>.
</p>

<p align="center">
  <a href="https://github.com/wimi321/super-lobster-os/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/wimi321/super-lobster-os/ci.yml?style=for-the-badge&label=CI"></a>
  <a href="./LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-0f172a?style=for-the-badge"></a>
  <img alt="Node 20+" src="https://img.shields.io/badge/node-20%2B-0f766e?style=for-the-badge">
  <img alt="Status Alpha" src="https://img.shields.io/badge/status-alpha-f97316?style=for-the-badge">
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a>
  ·
  <a href="#what-makes-it-different">Why It Hits Different</a>
  ·
  <a href="#architecture">Architecture</a>
  ·
  <a href="#roadmap">Roadmap</a>
</p>

## The Pitch

Most AI developer products are stuck in one of two boxes:

- They live in chat surfaces and know too little about the repo.
- They understand the repo but act like a glorified terminal tab.

**Super Lobster OS** is the bet that the next breakout open-source developer assistant should do both.

It should:

- understand the workspace,
- remember what the team has learned,
- classify operational risk before acting,
- route the next step to the right surface,
- and stay publishable, forkable, and legally clean.

## What Makes It Different

| Capability | What it means in practice |
| --- | --- |
| Mission planning | Turn a prompt into a sequenced plan grounded in the current workspace |
| Safety guardrails | Block destructive commands and flag sensitive operations for review |
| Persistent memory | Save durable repo learnings in `.lobsteros/memory.json` |
| Channel routing | Recommend whether a task belongs in terminal, GitHub, Slack, or mobile surfaces |
| Clean-room posture | Inspired by strong ecosystems, but rebuilt as original public code |
| Markdown reports | Export legible mission briefs for issues, PRs, or handoffs |

## Why This Project Exists

Super Lobster OS is being intentionally built as a **clean-room** project inspired by:

- OpenClaw's channel-native operator philosophy
- the workspace-aware workflow style of modern coding agents

This repository does **not** redistribute proprietary Claude Code source.
It rebuilds the useful patterns in original code so the project can become a serious public GitHub repo instead of a risky private fork.

## Current Feature Set

- `lobsteros init` creates workspace config under `.lobsteros/config.json`
- `lobsteros plan` generates a workspace-aware mission plan
- `lobsteros report` exports a markdown mission brief
- `lobsteros guard` classifies a command as `allow`, `review`, or `deny`
- `lobsteros route` recommends the best collaboration surface
- `lobsteros learn` stores durable operational knowledge
- `lobsteros doctor` inspects project readiness and memory health

## Quick Start

```bash
git clone https://github.com/wimi321/super-lobster-os.git
cd super-lobster-os
npm test
node src/cli.mjs init --workspace "Payments Core"
node src/cli.mjs plan --message "refactor the billing retry worker"
node src/cli.mjs report --message "prepare the release checklist"
node src/cli.mjs guard --command "git push origin main"
node src/cli.mjs route --target github
node src/cli.mjs learn --note "billing retries depend on redis locks"
node src/cli.mjs doctor
```

## Example Mission Report

```md
# Mission Report

## Mission

- Prompt: prepare the release checklist
- Workspace: Payments Core
- Directory: /your/project
- Runtime: v24.x on darwin

## Plan

1. Prepare release gates - Verify environment, secrets, rollback steps, and smoke tests.
2. Map the system boundary - Inspect repository shape, critical packages, and integration seams.
3. Build a safe execution plan - Separate low-risk local work from anything that needs explicit review.
4. Ship a visible vertical slice - Implement one end-to-end capability the team can demo immediately.
5. Add observability and docs - Document workflows, assumptions, and the next contribution surface.
```

## Architecture

<div align="center">
  <img src="./docs/assets/mission-map.svg" alt="Super Lobster OS architecture map" width="100%">
</div>

### Core modules

- `src/core/config.mjs`: workspace bootstrap and config loading
- `src/core/workspace-memory.mjs`: durable mission memory and learnings
- `src/core/planner.mjs`: mission planning based on prompt intent and workspace shape
- `src/core/safety-policy.mjs`: command classification and destructive command denial
- `src/core/channel-router.mjs`: surface recommendation for terminal, GitHub, Slack, and Telegram
- `src/core/reporter.mjs`: markdown mission handoff generator
- `src/core/mission-control.mjs`: orchestration layer tying everything together
- `src/cli.mjs`: zero-dependency terminal interface

Deep dive: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

## Command Surface

| Command | Purpose |
| --- | --- |
| `lobsteros init --workspace "Payments Core"` | Bootstraps local config for a repo |
| `lobsteros plan --message "audit auth flow"` | Produces a structured execution plan |
| `lobsteros report --message "ship release candidate"` | Outputs a markdown mission brief |
| `lobsteros guard --command "git push origin main"` | Scores command safety |
| `lobsteros route --target github` | Recommends a collaboration surface |
| `lobsteros learn --note "staging uses synthetic data"` | Persists durable learnings |
| `lobsteros doctor` | Reports repo readiness and memory status |

## Design Principles

1. **Workspace over thread**: the repo is the unit of memory.
2. **Safety over bravado**: destructive actions are blocked, not glamorized.
3. **Operator UX**: every output should help a real person decide the next move.
4. **Multi-surface by default**: terminal is primary, but not the whole product.
5. **Public engineering quality**: tests, docs, and repo hygiene are first-class.

## Project Layout

```text
super-lobster-os/
├── docs/
│   ├── assets/
│   ├── ARCHITECTURE.md
│   ├── COMPARISON.md
│   └── ROADMAP.md
├── examples/
├── src/
│   ├── core/
│   ├── utils/
│   └── cli.mjs
└── test/
```

## Roadmap

### Near-term

- richer config profiles and policy packs
- shell execution adapters with approval gates
- GitHub issue and PR workflows
- Slack and Telegram outbound adapters
- better evaluation fixtures for realistic team missions

### Mid-term

- background mission daemons
- live TUI mission dashboard
- role-specialized agent flows
- plugin SDK and adapter marketplace

Full roadmap: [docs/ROADMAP.md](./docs/ROADMAP.md)

## Comparison

Super Lobster OS is aiming for a distinct position:

- more workspace-native than messaging-only assistants
- more channel-native than terminal-only coding agents
- more publishable than private or proprietary forks

Read [docs/COMPARISON.md](./docs/COMPARISON.md)

## Development

```bash
npm test
npm run demo
npm run report
```

## Contributing

Strong contributions include:

1. improving plan quality for real repos
2. adding safer execution policies
3. building real collaboration adapters
4. expanding evaluation fixtures and benchmarks

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR.

## Security

If you discover a vulnerability, follow [SECURITY.md](./SECURITY.md).

## Notice

Project provenance and clean-room boundaries are documented in [NOTICE.md](./NOTICE.md).

## Credits

- OpenClaw for showing how far a channel-native assistant can go.
- The broader coding-agent ecosystem for raising the bar on terminal UX and workspace awareness.
