// Simple in-memory cache with optional expiration
const cache = new Map<string, { data: any; timestamp: number }>();
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

export function setCache(key: string, data: any, ttl = DEFAULT_TTL) {
  cache.set(key, {
    data,
    timestamp: Date.now() + ttl
  });
}

export function getCache(key: string) {
  const cached = cache.get(key);
  
  if (!cached) return null;
  
  // Check if expired
  if (Date.now() > cached.timestamp) {
    cache.delete(key);
    return null;
  }
  
  return cached.data;
}

export function clearCache(key?: string) {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
}

export function getCacheOrNull(key: string) {
  return getCache(key) ?? null;
}
