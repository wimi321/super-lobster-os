import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

export function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
  return dirPath;
}

export function getConfigRoot(cwd = process.cwd()) {
  return ensureDir(path.join(cwd, '.lobsteros'));
}

export function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) {
    return fallback;
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function writeJson(filePath, value) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

export function summarizeWorkspace(cwd = process.cwd()) {
  const entries = fs.readdirSync(cwd, { withFileTypes: true }).filter((entry) => !entry.name.startsWith('.'));
  const files = entries.filter((entry) => entry.isFile()).slice(0, 12).map((entry) => entry.name);
  const directories = entries.filter((entry) => entry.isDirectory()).slice(0, 12).map((entry) => entry.name);

  return {
    cwd,
    files,
    directories,
    platform: os.platform(),
    node: process.version,
    repoDetected: fs.existsSync(path.join(cwd, '.git')),
  };
}
