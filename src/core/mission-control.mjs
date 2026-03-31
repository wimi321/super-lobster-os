import { WorkspaceMemory } from './workspace-memory.mjs';
import { createPlan } from './planner.mjs';
import { assessCommand } from './safety-policy.mjs';
import { createChannelRouter } from './channel-router.mjs';
import { initConfig, loadConfig } from './config.mjs';
import { toMissionReport } from './reporter.mjs';
import { summarizeWorkspace } from '../utils/fs.mjs';

export class MissionControl {
  constructor(cwd = process.cwd()) {
    this.cwd = cwd;
    this.memory = new WorkspaceMemory(cwd);
    this.config = loadConfig(cwd);
    this.router = createChannelRouter(this.config.channels);
  }

  brief(prompt) {
    const workspace = summarizeWorkspace(this.cwd);
    const plan = createPlan(prompt, workspace);
    this.memory.rememberMission(prompt, plan);

    return {
      prompt,
      workspace,
      plan,
      config: this.config,
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

  init(workspaceName = 'Unnamed Workspace') {
    this.config = initConfig(this.cwd, { workspaceName });
    this.router = createChannelRouter(this.config.channels);
    return this.config;
  }

  report(prompt) {
    const brief = this.brief(prompt);
    return {
      ...brief,
      markdown: toMissionReport(brief),
    };
  }

  doctor() {
    const workspace = summarizeWorkspace(this.cwd);
    const memory = this.memory.load();

    return {
      workspace,
      config: this.config,
      memoryEntries: memory.missions.length,
      learnings: memory.learnings.length,
      suggestions: [
        workspace.repoDetected ? 'Git repository detected; enable PR and issue automations next.' : 'Initialize git to unlock release automation and team workflows.',
        workspace.directories.length > 0 ? 'Workspace shape looks healthy; add project-specific skills under .lobsteros next.' : 'Add source folders so the agent can build better plans.',
      ],
    };
  }
}
