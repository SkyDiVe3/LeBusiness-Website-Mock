import { z } from "zod";

export const LegacyRouteSchema = z.object({
  sourceUrl: z.string().url(),
  localPath: z.string().startsWith("/"),
  status: z.number().int().min(100).max(599),
  contentType: z.string().min(1),
  checksum: z.string().regex(/^[a-f0-9]{64}$/).optional()
});

export type LegacyRoute = z.infer<typeof LegacyRouteSchema>;

export const ImportFailureSchema = z.object({
  sourceUrl: z.string().url(),
  phase: z.enum(["page", "asset", "parse", "persist"]),
  status: z.number().int().min(100).max(599).optional(),
  reason: z.string().min(3)
});

export function normalizeLegacyRoute(input: unknown): LegacyRoute {
  const route = LegacyRouteSchema.parse(input);
  const pathname = new URL(route.sourceUrl).pathname;
  return LegacyRouteSchema.parse({ ...route, localPath: decodeURIComponent(pathname) || "/" });
}
