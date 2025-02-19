import { eq } from "drizzle-orm";
import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";

interface SubscribeToEventParams {
  name: string;
  email: string;
}

export async function subscribeToEvent({
  name,
  email,
}: SubscribeToEventParams): Promise<{ subscriptionId: string }> {
  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email))
    .limit(1);

  if (subscribers.length > 0) {
    if (!subscribers[0].id) {
      throw new Error("Subscriber ID is missing");
    }
    return { subscriptionId: subscribers[0].id! };
  }

  const result = await db
    .insert(subscriptions)
    .values({ name, email })
    .returning();

  const subscriber = result[0];
  if (!subscriber?.id) {
    throw new Error("Subscriber ID is missing");
  }

  return {
    subscriptionId: subscriber.id,
  };
}
