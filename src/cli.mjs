#!/usr/bin/env node
import { MissionControl } from './core/mission-control.mjs';

function parseArgs(argv) {
  const [command = 'help', ...rest] = argv;
  const args = { _: [] };

  for (let index = 0; index < rest.length; index += 1) {
    const token = rest[index];
    if (token.startsWith('--')) {
      args[token.slice(2)] = rest[index + 1] && !rest[index + 1].startsWith('--') ? rest[++index] : true;
    } else {
      args._.push(token);
    }
  }

  return { command, args };
}

function printJson(value) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

function printHelp() {
  process.stdout.write(`Super Lobster OS\n\nCommands:\n  lobsteros init --workspace \"Payments Core\"\n  lobsteros demo --message \"ship the release checklist\"\n  lobsteros plan --message \"audit the auth flow\"\n  lobsteros report --message \"cut a release candidate\"\n  lobsteros guard --command \"git push origin main\"\n  lobsteros route --target github\n  lobsteros learn --note \"billing retries depend on redis locks\"\n  lobsteros doctor\n`);
}

const { command, args } = parseArgs(process.argv.slice(2));
const control = new MissionControl(process.cwd());

switch (command) {
  case 'demo':
  case 'plan': {
    const message = args.message || args._.join(' ') || 'Map the next mission';
    printJson(control.brief(message));
    break;
  }
  case 'report': {
    const message = args.message || args._.join(' ') || 'Map the next mission';
    const result = control.report(message);
    if (args.format === 'json') {
      printJson(result);
    } else {
      process.stdout.write(result.markdown);
    }
    break;
  }
  case 'guard': {
    const target = args.command || args._.join(' ');
    printJson(control.guard(target));
    break;
  }
  case 'route': {
    const target = args.target || args._[0] || 'terminal';
    printJson(control.route(target));
    break;
  }
  case 'learn': {
    const note = args.note || args._.join(' ') || 'No note provided.';
    printJson(control.learn(note));
    break;
  }
  case 'init': {
    const workspaceName = args.workspace || args._.join(' ') || 'Unnamed Workspace';
    printJson(control.init(workspaceName));
    break;
  }
  case 'doctor': {
    printJson(control.doctor());
    break;
  }
  default:
    printHelp();
}
