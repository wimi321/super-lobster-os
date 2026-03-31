const DEFAULT_CHANNELS = {
  terminal: { latency: 'instant', trust: 'high', useCase: 'local execution and code navigation' },
  github: { latency: 'medium', trust: 'medium', useCase: 'handoffs, issues, and review loops' },
  slack: { latency: 'medium', trust: 'medium', useCase: 'team coordination and status pushes' },
  telegram: { latency: 'fast', trust: 'medium', useCase: 'mobile check-ins and lightweight command dispatch' },
};

export function createChannelRouter(config = {}) {
  const channels = { ...DEFAULT_CHANNELS, ...config };

  return {
    channels,
    recommend(target) {
      const normalized = target.toLowerCase();
      if (channels[normalized]) {
        return { channel: normalized, ...channels[normalized] };
      }
      return { channel: 'terminal', ...channels.terminal };
    },
    list() {
      return Object.entries(channels).map(([name, value]) => ({ name, ...value }));
    },
  };
}
