import z from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { subscribeToEvent } from "../function/subscribe-to-event";

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/subscriptions",
    {
      schema: {
        summary: "Subscrubes someone to the event",
        tags: ["subiscripiton"],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            subscriptionId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body;
      const { subscriptionId } = await subscribeToEvent({ name, email });
      return reply.status(201).send({
        subscriptionId,
      });
    }
  );
};
