const PLAN_LIBRARY = [
  ['Map the system boundary', 'Inspect repository shape, critical packages, and integration seams.'],
  ['Build a safe execution plan', 'Separate low-risk local work from anything that needs explicit review.'],
  ['Ship a visible vertical slice', 'Implement one end-to-end capability the team can demo immediately.'],
  ['Add observability and docs', 'Document workflows, assumptions, and the next contribution surface.'],
];

export function createPlan(prompt, workspaceSummary) {
  const keywords = prompt.toLowerCase();
  const tailored = [];

  if (keywords.includes('deploy') || keywords.includes('release')) {
    tailored.push(['Prepare release gates', 'Verify environment, secrets, rollback steps, and smoke tests.']);
  }
  if (keywords.includes('refactor') || keywords.includes('migrate')) {
    tailored.push(['Protect behavior first', 'Snapshot current flows and define non-regression checks before edits.']);
  }
  if (keywords.includes('ui') || keywords.includes('design')) {
    tailored.push(['Prototype the interface', 'Ship a bold but readable first pass that works on desktop and mobile.']);
  }

  const steps = [...tailored, ...PLAN_LIBRARY].slice(0, 5).map(([title, detail], index) => ({
    id: `step-${index + 1}`,
    title,
    detail,
    outcome: `Aligned with workspace ${workspaceSummary.cwd}`,
  }));

  return {
    mission: prompt,
    workspace: workspaceSummary,
    steps,
    generatedAt: new Date().toISOString(),
  };
}
