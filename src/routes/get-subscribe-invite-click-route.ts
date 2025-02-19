import z from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { getSubscribeInviteClick } from "../function/get-subscribe-invite-click";

export const getSubscribeInviteClickRoute: FastifyPluginAsyncZod = async (
  app
) => {
  app.get(
    "/subscribers/:subscriberId/ranking/clicks",
    {
      schema: {
        summary: "get subscribe invite clicks count",
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
      const { count } = await getSubscribeInviteClick({ subscriberId });
      return { count };
    }
  );
};
