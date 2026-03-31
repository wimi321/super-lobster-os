const RISKY_PATTERNS = [
  /rm\s+-rf/i,
  /git\s+reset\s+--hard/i,
  /drop\s+database/i,
  /truncate\s+table/i,
  /curl\s+.*\|\s*(bash|sh)/i,
];

export function assessCommand(command) {
  const matched = RISKY_PATTERNS.find((pattern) => pattern.test(command));

  if (matched) {
    return {
      allowed: false,
      reason: `Blocked by workspace safety policy: ${matched}`,
      mode: 'deny',
    };
  }

  const requiresReview = /(deploy|publish|release|push|migration|migrate)/i.test(command);
  return {
    allowed: true,
    reason: requiresReview ? 'Review before running in production-facing environments.' : 'Safe for local execution.',
    mode: requiresReview ? 'review' : 'allow',
  };
}
