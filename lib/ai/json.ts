type Validator<T> = (value: unknown) => T;

export class AiJsonError extends Error {
  constructor(message = "Invalid AI JSON response") {
    super(message);
    this.name = "AiJsonError";
  }
}

export function extractJsonValue(text: string): unknown {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const firstObjectIndex = cleaned.indexOf("{");
    const lastObjectIndex = cleaned.lastIndexOf("}");

    if (firstObjectIndex === -1 || lastObjectIndex === -1 || lastObjectIndex <= firstObjectIndex) {
      throw new AiJsonError();
    }

    try {
      return JSON.parse(cleaned.slice(firstObjectIndex, lastObjectIndex + 1));
    } catch {
      throw new AiJsonError();
    }
  }
}

export function parseAiJson<T>(text: string | undefined, validator: Validator<T>): T {
  if (!text) {
    throw new AiJsonError("AI response was empty");
  }

  return validator(extractJsonValue(text));
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function requiredString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new AiJsonError(`Missing string field: ${field}`);
  }

  return value.trim();
}

export function requiredNumber(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new AiJsonError(`Missing number field: ${field}`);
  }

  return value;
}

export function requiredEnum<T extends string>(value: unknown, field: string, allowed: readonly T[]): T {
  if (typeof value !== "string" || !allowed.includes(value as T)) {
    throw new AiJsonError(`Invalid enum field: ${field}`);
  }

  return value as T;
}
