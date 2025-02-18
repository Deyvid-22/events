import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";
import { redis } from "../redis/client";

interface acessInviteParams {
  subscriberId: string;
}

export async function acessInviteLink({ subscriberId }: acessInviteParams) {
  await redis.hincrby("referral:acess-acount", subscriberId, 1);
}
