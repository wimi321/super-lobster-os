import { WorkspaceMemory } from './workspace-memory.mjs';
import { createPlan } from './planner.mjs';
import { assessCommand } from './safety-policy.mjs';
import { createChannelRouter } from './channel-router.mjs';
import { summarizeWorkspace } from '../utils/fs.mjs';

export class MissionControl {
  constructor(cwd = process.cwd()) {
    this.cwd = cwd;
    this.memory = new WorkspaceMemory(cwd);
    this.router = createChannelRouter();
  }

  brief(prompt) {
    const workspace = summarizeWorkspace(this.cwd);
    const plan = createPlan(prompt, workspace);
    this.memory.rememberMission(prompt, plan);

    return {
      prompt,
      workspace,
      plan,
      channels: this.router.list(),
    };
  }

  guard(command) {
    return assessCommand(command);
  }

  route(target) {
    return this.router.recommend(target);
  }

  learn(note) {
    return this.memory.rememberLearning(note);
  }

  doctor() {
    const workspace = summarizeWorkspace(this.cwd);
    const memory = this.memory.load();

    return {
      workspace,
      memoryEntries: memory.missions.length,
      learnings: memory.learnings.length,
      suggestions: [
        workspace.repoDetected ? 'Git repository detected; enable PR and issue automations next.' : 'Initialize git to unlock release automation and team workflows.',
        workspace.directories.length > 0 ? 'Workspace shape looks healthy; add project-specific skills under .lobsteros next.' : 'Add source folders so the agent can build better plans.',
      ],
    };
  }
}
