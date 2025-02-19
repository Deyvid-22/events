import z from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { getSubscribeRankingPosition } from "../function/get-subscriber-ranking-position";

export const getSubscribeRankingPositionRoute: FastifyPluginAsyncZod = async (
  app
) => {
  app.get(
    "/subscribers/:subscriberId/ranking/position",
    {
      schema: {
        summary: "get subscribe raking position",
        tags: ["referral"],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          200: z.object({
            position: z.number().nullable(),
          }),
        },
      },
    },
    async (request) => {
      const { subscriberId } = request.params;
      const { position } = await getSubscribeRankingPosition({ subscriberId });

      return { position };
    }
  );
};
