import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { MissionControl } from '../src/core/mission-control.mjs';

function createTempWorkspace() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lobsteros-'));
  fs.writeFileSync(path.join(tempDir, 'README.md'), '# temp\n', 'utf8');
  fs.mkdirSync(path.join(tempDir, 'src'));
  return tempDir;
}

test('brief creates a plan and persists memory', () => {
  const cwd = createTempWorkspace();
  const control = new MissionControl(cwd);
  const result = control.brief('refactor the payment retry worker');

  assert.equal(result.plan.mission, 'refactor the payment retry worker');
  assert.ok(result.plan.steps.length >= 4);
  assert.equal(result.workspace.cwd, cwd);

  const memoryFile = path.join(cwd, '.lobsteros', 'memory.json');
  assert.ok(fs.existsSync(memoryFile));
});

test('guard blocks destructive commands', () => {
  const control = new MissionControl(createTempWorkspace());
  const result = control.guard('rm -rf ./dist');
  assert.equal(result.allowed, false);
  assert.equal(result.mode, 'deny');
});

test('doctor returns actionable suggestions', () => {
  const cwd = createTempWorkspace();
  const control = new MissionControl(cwd);
  const result = control.doctor();

  assert.equal(Array.isArray(result.suggestions), true);
  assert.equal(result.suggestions.length, 2);
});

test('route returns a known channel profile', () => {
  const control = new MissionControl(createTempWorkspace());
  const route = control.route('github');

  assert.equal(route.channel, 'github');
  assert.equal(route.useCase, 'handoffs, issues, and review loops');
});

test('learn persists workspace learnings', () => {
  const cwd = createTempWorkspace();
  const control = new MissionControl(cwd);
  const result = control.learn('billing retries use a redis lock');

  assert.equal(result.learnings[0].note, 'billing retries use a redis lock');
});

test('init writes workspace config', () => {
  const cwd = createTempWorkspace();
  const control = new MissionControl(cwd);
  const config = control.init('Payments Core');

  assert.equal(config.workspaceName, 'Payments Core');
  assert.ok(fs.existsSync(path.join(cwd, '.lobsteros', 'config.json')));
});

test('report returns markdown mission brief', () => {
  const cwd = createTempWorkspace();
  const control = new MissionControl(cwd);
  control.init('Observability Lab');
  const result = control.report('prepare the release checklist');

  assert.match(result.markdown, /# Mission Report/);
  assert.match(result.markdown, /Workspace: Observability Lab/);
  assert.match(result.markdown, /Available Channels/);
});
