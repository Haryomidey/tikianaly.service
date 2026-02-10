export type RetryOptions = {
  retries: number;
  baseDelayMs: number;
  maxDelayMs: number;
  shouldRetry?: (error: unknown) => boolean;
};

export async function withRetry<T>(fn: () => Promise<T>, opts: RetryOptions): Promise<T> {
  let attempt = 0;
  let lastError: unknown;

  while (attempt <= opts.retries) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      const shouldRetry = opts.shouldRetry ? opts.shouldRetry(err) : true;
      if (!shouldRetry || attempt === opts.retries) {
        throw err;
      }
      const delay = Math.min(opts.baseDelayMs * 2 ** attempt, opts.maxDelayMs);
      await new Promise((resolve) => setTimeout(resolve, delay));
      attempt += 1;
    }
  }

  throw lastError;
}

