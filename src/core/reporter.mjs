export function toMissionReport({ prompt, workspace, plan, channels, config }) {
  const lines = [
    '# Mission Report',
    '',
    `## Mission`,
    '',
    `- Prompt: ${prompt}`,
    `- Workspace: ${config.workspaceName}`,
    `- Directory: ${workspace.cwd}`,
    `- Runtime: ${workspace.node} on ${workspace.platform}`,
    '',
    '## Plan',
    '',
    ...plan.steps.map((step, index) => `${index + 1}. ${step.title} - ${step.detail}`),
    '',
    '## Available Channels',
    '',
    ...channels.map((channel) => `- ${channel.name}: ${channel.useCase} (${channel.latency}, trust ${channel.trust})`),
    '',
    '## Workspace Snapshot',
    '',
    `- Files: ${workspace.files.join(', ') || 'None'}`,
    `- Directories: ${workspace.directories.join(', ') || 'None'}`,
    `- Git detected: ${workspace.repoDetected ? 'yes' : 'no'}`,
  ];

  return `${lines.join('\n')}\n`;
}
