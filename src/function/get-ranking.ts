import { inArray } from "drizzle-orm";
import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";
import { redis } from "../redis/client";

export async function getRanking() {
  const ranking = await redis.zrevrange("referral:ranking", 0, 2, "WITHSCORES");
  const subscribeIdAndScore: Record<string, number> = {};

  for (let i = 0; i < ranking.length; i += 2) {
    subscribeIdAndScore[ranking[i]] = Number.parseInt(ranking[i + 1]);
  }

  console.log(Object.keys(subscribeIdAndScore));

  const subscribe = await db
    .select()
    .from(subscriptions)
    .where(inArray(subscriptions.id, Object.keys(subscribeIdAndScore)))
    .limit(3);

  const rankingWithScore = subscribe
    .map((subscribe) => {
      return {
        id: subscribe.id,
        name: subscribe.name,
        score: subscribeIdAndScore[subscribe.id],
      };
    })
    .sort((sub1, sub2) => {
      return sub2.score - sub1.score;
    });

  console.log(rankingWithScore);

  return rankingWithScore;
}
