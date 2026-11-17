import pino from "pino";
import { z } from "zod";

export const RuntimeEnvironmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  DATABASE_URL: z.string().url().optional(),
  REDIS_URL: z.string().url().optional(),
  MEILISEARCH_URL: z.string().url().optional(),
  MEILISEARCH_MASTER_KEY: z.string().min(16).optional()
});

export type RuntimeEnvironment = z.infer<typeof RuntimeEnvironmentSchema>;

export function readRuntimeEnvironment(input: unknown): RuntimeEnvironment {
  return RuntimeEnvironmentSchema.parse(input);
}

export function createLogger(name: string): pino.Logger {
  return pino({ name, level: process.env["NODE_ENV"] === "production" ? "info" : "debug" });
}
