import crypto from "crypto";

export function stableId(namespace: string, ...parts: Array<string | number | undefined | null>): string {
  const clean = parts.filter((p) => p !== undefined && p !== null).map(String).join(":");
  const raw = `${namespace}:${clean}`;
  const hash = crypto.createHash("sha1").update(raw).digest("hex");
  return `${namespace}:${hash}`;
}

