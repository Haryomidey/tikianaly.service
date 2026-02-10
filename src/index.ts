import "dotenv/config";
import { GoalServeHttpClient } from "./infrastructure/goalserve/GoalServeHttpClient";
import { GoalServeFeedClient } from "./infrastructure/goalserve/GoalServeFeedClient";
import { GoalServeLiveScoreAdapter } from "./infrastructure/goalserve/adapters/GoalServeLiveScoreAdapter";
import { LiveMatchRepository } from "./infrastructure/persistence/mongoose/repositories/LiveMatchRepository";
import { ConsoleLogger } from "./infrastructure/logging/ConsoleLogger";
import { SsePublisher } from "./infrastructure/sse/SsePublisher";
import { LiveMatchIngestionService } from "./application/services/LiveMatchIngestionService";
import { Scheduler } from "./application/scheduler/Scheduler";
import dotenv from 'dotenv';

dotenv.config();

const logger = new ConsoleLogger();

const http = new GoalServeHttpClient({
  baseUrl: process.env.GOALSERVE_BASE_URL ?? "https://www.goalserve.com/getfeed",
  apiKey: process.env.GOALSERVE_API_KEY ?? "",
  apiKeyMode: "path",
  timeoutMs: 8000,
});

const feedClient = new GoalServeFeedClient(http);
const liveAdapter = new GoalServeLiveScoreAdapter();
const liveRepo = new LiveMatchRepository();
const publisher = new SsePublisher({
  publish: async () => {
    return;
  },
});

const liveService = new LiveMatchIngestionService(feedClient, liveAdapter, liveRepo, publisher, logger);

const scheduler = new Scheduler(logger);
scheduler.register({ name: "live", intervalMs: 15 * 1000, service: liveService });

process.on("SIGTERM", () => {
  void scheduler.shutdown();
});
