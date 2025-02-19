import { redis } from "../redis/client";

interface GetSubscribeInvitePositionParams {
  subscriberId: string;
}

export async function getSubscribeRankingPosition({
  subscriberId,
}: GetSubscribeInvitePositionParams) {
  const rank = await redis.zrevrank("referral:ranking", subscriberId);

  if (rank === null) {
    return { position: null };
  }

  return { position: rank + 1 };
}
