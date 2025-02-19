import z from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getRanking } from "../function/get-ranking";

export const getRankingRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/ranking",
    {
      schema: {
        summary: "get ranking",
        tags: ["referral"],
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                score: z.number(),
              })
            ),
          }),
        },
      },
    },
    async () => {
      const rankingWithScore = await getRanking();
      return { ranking: rankingWithScore };
    }
  );
};
