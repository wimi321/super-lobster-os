import fs from 'node:fs';
import path from 'node:path';
import { ensureDir, getConfigRoot, writeJson } from '../utils/fs.mjs';

const DEFAULT_CONFIG = {
  workspaceName: 'Unnamed Workspace',
  missionStyle: 'operator',
  channels: {
    terminal: { latency: 'instant', trust: 'high', useCase: 'local execution and code navigation' },
    github: { latency: 'medium', trust: 'medium', useCase: 'handoffs, issues, and review loops' },
    slack: { latency: 'medium', trust: 'medium', useCase: 'team coordination and status pushes' },
    telegram: { latency: 'fast', trust: 'medium', useCase: 'mobile check-ins and lightweight command dispatch' }
  },
  policies: {
    destructiveCommands: 'deny',
    deployments: 'review'
  }
};

export function getConfigFile(cwd = process.cwd()) {
  return path.join(getConfigRoot(cwd), 'config.json');
}

export function loadConfig(cwd = process.cwd()) {
  const configFile = getConfigFile(cwd);
  if (!fs.existsSync(configFile)) {
    return { ...DEFAULT_CONFIG };
  }

  const parsed = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  return {
    ...DEFAULT_CONFIG,
    ...parsed,
    channels: {
      ...DEFAULT_CONFIG.channels,
      ...(parsed.channels || {}),
    },
    policies: {
      ...DEFAULT_CONFIG.policies,
      ...(parsed.policies || {}),
    },
  };
}

export function initConfig(cwd = process.cwd(), overrides = {}) {
  ensureDir(getConfigRoot(cwd));
  const config = {
    ...DEFAULT_CONFIG,
    ...overrides,
    channels: {
      ...DEFAULT_CONFIG.channels,
      ...(overrides.channels || {}),
    },
    policies: {
      ...DEFAULT_CONFIG.policies,
      ...(overrides.policies || {}),
    },
  };

  writeJson(getConfigFile(cwd), config);
  return config;
}

export function getDefaultConfig() {
  return { ...DEFAULT_CONFIG };
}
