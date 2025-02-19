import z from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { getSubscribeInviteCount } from "../function/get-subscribe-invite-count";

export const getSubscribeInviteCountRoute: FastifyPluginAsyncZod = async (
  app
) => {
  app.get(
    "/subscribers/:subscriberId/ranking/count",
    {
      schema: {
        summary: "get subscribe invite count",
        tags: ["referral"],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          200: z.object({
            count: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params;
      const { count } = await getSubscribeInviteCount({ subscriberId });
      return { count };
    }
  );
};
