import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";
import { redis } from "../redis/client";

interface getSubscribeInviteClickParams {
  subscriberId: string;
}

export async function getSubscribeInviteClick({
  subscriberId,
}: getSubscribeInviteClickParams) {
  const count = await redis.hget("referral:acess-acount", subscriberId);
  return { count: count ? Number.parseInt(count) : 0 };
}
