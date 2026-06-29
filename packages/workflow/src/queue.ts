import type { ActionInvocation } from "./types";

export interface Job {
  id: string;
  invocation: ActionInvocation;
  enqueuedAt: Date;
}

/**
 * Async boundary. In production back this with Redis/BullMQ (already available
 * in the stack); the in-memory implementation is for dev/tests and synchronous
 * draining.
 */
export interface JobQueue {
  enqueue(invocation: ActionInvocation): Promise<Job>;
}

export class InMemoryJobQueue implements JobQueue {
  private readonly jobs: Job[] = [];

  async enqueue(invocation: ActionInvocation): Promise<Job> {
    const job: Job = {
      id: crypto.randomUUID(),
      invocation,
      enqueuedAt: new Date(),
    };
    this.jobs.push(job);
    return job;
  }

  /** Pending jobs in FIFO order (drain target for a worker). */
  pending(): readonly Job[] {
    return this.jobs;
  }

  size(): number {
    return this.jobs.length;
  }
}
