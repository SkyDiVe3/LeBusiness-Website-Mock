import { createLogger, readRuntimeEnvironment } from "@doingbusiness/config";
import { ImportFailureSchema, LegacyRouteSchema } from "@doingbusiness/importer";
import { Worker } from "bullmq";
import IORedis from "ioredis";
import { z } from "zod";

const ImportJobSchema = z.object({
  route: LegacyRouteSchema,
  requestedAt: z.string().datetime()
});

const environment = readRuntimeEnvironment(process.env);
if (!environment.REDIS_URL) throw new Error("REDIS_URL este obligatoriu pentru worker.");

const logger = createLogger("import-worker");
const redis = new IORedis(environment.REDIS_URL, { maxRetriesPerRequest: null });

const worker = new Worker("legacy-import", async (job) => {
  const payload = ImportJobSchema.safeParse(job.data);
  if (!payload.success) {
    logger.warn({ jobId: job.id, issues: payload.error.flatten() }, "Rejected invalid import job");
    return ImportFailureSchema.parse({ sourceUrl: "https://doingbusiness.ro/invalid", phase: "parse", reason: "Invalid queue job payload" });
  }
  logger.info({ jobId: job.id, path: payload.data.route.localPath }, "Validated legacy route for import");
  return { imported: false, reason: "The production importer adapter is intentionally report-only until provenance review is complete." };
}, { connection: redis });

worker.on("failed", (job, error) => logger.error({ jobId: job?.id, error }, "Legacy import job failed"));
worker.on("ready", () => logger.info("Legacy import worker is ready"));
