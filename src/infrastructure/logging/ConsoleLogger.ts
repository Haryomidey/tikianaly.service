import { Logger, LogFields } from "../../domain/ports/Logger";

function normalizeError(value: unknown): unknown {
  if (value instanceof Error) {
    return { message: value.message, stack: value.stack, name: value.name };
  }
  return value;
}

function serialize(fields?: LogFields): string {
  if (!fields) return "";
  const normalized = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, normalizeError(value)]),
  );
  return JSON.stringify(normalized);
}

export class ConsoleLogger implements Logger {
  info(message: string, fields?: LogFields): void {
    console.log(`[info] ${message}`, serialize(fields));
  }

  warn(message: string, fields?: LogFields): void {
    console.warn(`[warn] ${message}`, serialize(fields));
  }

  error(message: string, fields?: LogFields): void {
    console.error(`[error] ${message}`, serialize(fields));
  }
}
