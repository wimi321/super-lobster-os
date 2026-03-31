# Architecture

## Thesis

Super Lobster OS treats an AI assistant as a workspace operating layer.
The core loop is simple:

1. Observe the workspace.
2. Turn the user request into a mission.
3. Apply safety policy before action.
4. Recommend the right collaboration surface.
5. Persist what the system learned.

## Current Modules

### `MissionControl`

`MissionControl` is the orchestrator. It owns the contract between planning, memory, safety, and routing.

### `WorkspaceMemory`

Stores durable mission context under `.lobsteros/memory.json` so a repository can accumulate useful operational history.

### `Planner`

Generates a structured sequence of execution steps. The planner is intentionally simple today, but the interface is designed so learned heuristics, models, or policy engines can swap in later.

### `SafetyPolicy`

Classifies commands into:

- `allow`
- `review`
- `deny`

The design goal is explicitness. The runtime should always be able to explain why something is safe, reviewable, or blocked.

### `ChannelRouter`

Embeds the OpenClaw-style insight that not all work belongs in the terminal. Some missions should surface in GitHub, some in Slack, some on mobile-first channels.

## Future Architecture

```text
Inbound Mission
   -> Workspace Scanner
   -> Planner
   -> Policy Engine
   -> Execution Graph
   -> Channel Adapters
   -> Memory + Telemetry
```

## Clean-Room Positioning

This project intentionally avoids publishing proprietary Claude Code source or derivative code. The architecture is original, while the product direction openly acknowledges inspiration from public ecosystems and legal open-source projects such as OpenClaw.
