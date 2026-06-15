import { oo } from "@orpc/openapi";
import { os as baseOs, ORPCError } from "@orpc/server";
import { env } from "@typebot.io/env";
import type { Context } from "./context";

export const os = baseOs.$context<Context>();

const errorLoggingMiddleware = os.middleware(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (env.NODE_ENV !== "production") console.error(error);
    throw error;
  }
});

const requireAuth = oo.spec(
  os.middleware(async ({ next, context }) => {
    const user = await context.authenticate();
    if (user) {
      return next({
        context: {
          ...context,
          user,
        },
      });
    }
    throw new ORPCError("UNAUTHORIZED", {
      message: "You must be logged in to access this resource",
    });
  }),
  {
    security: [{ bearerAuth: [] }],
  },
);

const needsOptionalAuthenticatedUser = os.middleware(
  async ({ next, context }) => {
    const user = await context.authenticate();
    return next({
      context: {
        ...context,
        user,
      },
    });
  },
);

export const publicProcedure = os.use(errorLoggingMiddleware);

export const publicProcedureWithOptionalUser = publicProcedure.use(
  needsOptionalAuthenticatedUser,
);

export const authenticatedProcedure = publicProcedure.use(requireAuth);
