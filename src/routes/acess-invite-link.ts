import z from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { env } from "../env";
import { acessInviteLink } from "../function/acess-invite-link";
import { redis } from "../redis/client";

export const acessInviteLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/invites/:subscriberId",
    {
      schema: {
        summary: "acess invite links redirects user",
        tags: ["referral"],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params;
      await acessInviteLink({ subscriberId });

      const redirecitUrl = new URL(env.WEB_URL);
      redirecitUrl.searchParams.set("referr", subscriberId);
      return reply.redirect(redirecitUrl.toString(), 302);
    }
  );
};
