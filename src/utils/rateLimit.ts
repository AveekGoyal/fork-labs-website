interface RateLimitConfig {
    interval: number;
    uniqueTokenPerInterval: number;
  }
  
  interface RateLimitInfo {
    timestamp: number;
    count: number;
  }
  
  /**
   * Simple in-memory rate limiting implementation
   */
  export default function rateLimit(config: RateLimitConfig) {
    const windowMap = new Map<string, RateLimitInfo>();
  
    return {
      async check(limit: number, identifier: string) {
        const now = Date.now();
        const windowStart = now - config.interval;
        
        // Clean up old entries
        for (const [key, info] of windowMap.entries()) {
          if (info.timestamp < windowStart) {
            windowMap.delete(key);
          }
        }
  
        // Check if we've exceeded uniqueTokenPerInterval
        if (windowMap.size >= config.uniqueTokenPerInterval) {
          throw new Error('Too many unique tokens');
        }
  
        // Get or create rate limit info for this identifier
        const rateLimitInfo = windowMap.get(identifier) || {
          timestamp: now,
          count: 0
        };
  
        // Reset count if we're in a new window
        if (rateLimitInfo.timestamp < windowStart) {
          rateLimitInfo.timestamp = now;
          rateLimitInfo.count = 0;
        }
  
        // Check if we've exceeded the limit
        if (rateLimitInfo.count >= limit) {
          throw new Error('Rate limit exceeded');
        }
  
        // Increment count and update timestamp
        rateLimitInfo.count++;
        rateLimitInfo.timestamp = now;
        windowMap.set(identifier, rateLimitInfo);
  
        return true;
      }
    };
  }