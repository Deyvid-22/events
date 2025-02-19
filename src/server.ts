import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";

import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { subscribeToEventRoute } from "./routes/subscribe-to-event-route";
import { env } from "./env";
import { acessInviteLinkRoute } from "./routes/acess-invite-link-route";
import { getSubscribeInviteClickRoute } from "./routes/get-subscribe-invite-click-route";
import { getSubscribeInviteCount } from "./function/get-subscribe-invite-count";
import { getSubscribeInviteCountRoute } from "./routes/get-subscribe-invite-count-route";
import { getSubscribeRankingPositionRoute } from "./routes/get-subscriber-ranking-position-route";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Events API",
      version: "0.0.1",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(subscribeToEventRoute);
app.register(acessInviteLinkRoute);
app.register(getSubscribeInviteClickRoute);
app.register(getSubscribeInviteCountRoute);
app.register(getSubscribeRankingPositionRoute);

app.listen({ port: env.PORT }).then(() => console.log("server running"));
