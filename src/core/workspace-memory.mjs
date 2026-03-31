import path from 'node:path';
import { getConfigRoot, readJson, writeJson, summarizeWorkspace } from '../utils/fs.mjs';

const DEFAULT_MEMORY = {
  workspace: null,
  missions: [],
  learnings: [],
  updatedAt: null,
};

export class WorkspaceMemory {
  constructor(cwd = process.cwd()) {
    this.cwd = cwd;
    this.memoryFile = path.join(getConfigRoot(cwd), 'memory.json');
  }

  load() {
    return readJson(this.memoryFile, { ...DEFAULT_MEMORY, workspace: summarizeWorkspace(this.cwd) });
  }

  save(memory) {
    const next = {
      ...memory,
      workspace: summarizeWorkspace(this.cwd),
      updatedAt: new Date().toISOString(),
    };

    writeJson(this.memoryFile, next);
    return next;
  }

  rememberMission(prompt, plan) {
    const memory = this.load();
    memory.missions.unshift({
      prompt,
      plan,
      createdAt: new Date().toISOString(),
    });
    memory.missions = memory.missions.slice(0, 20);
    return this.save(memory);
  }

  rememberLearning(note) {
    const memory = this.load();
    memory.learnings.unshift({
      note,
      createdAt: new Date().toISOString(),
    });
    memory.learnings = memory.learnings.slice(0, 20);
    return this.save(memory);
  }
}
