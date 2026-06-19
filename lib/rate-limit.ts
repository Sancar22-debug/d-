export function rateLimit({
  interval = 60000,
  uniqueTokenPerInterval = 500,
}: {
  interval?: number;
  uniqueTokenPerInterval?: number;
} = {}) {
  const tokenCache = new Map();
  let lastInterval = Date.now();

  return {
    check: async (limit: number, token: string) => {
      const now = Date.now();

      // Reset cache if interval has passed
      if (now - lastInterval > interval) {
        tokenCache.clear();
        lastInterval = now;
      }

      const tokenCount = (tokenCache.get(token) as number[]) || [0];
      if (tokenCount[0] === 0) {
        tokenCache.set(token, tokenCount);
      }
      tokenCount[0] += 1;

      const currentUsage = tokenCount[0];
      const isRateLimited = currentUsage >= limit;

      if (tokenCache.size > uniqueTokenPerInterval) {
        // Prevent memory leak by occasionally clearing the Map if it gets too large
        tokenCache.clear();
      }

      if (isRateLimited) {
        return Promise.reject(new Error("Rate limit exceeded"));
      }
      
      return Promise.resolve();
    },
  };
}
