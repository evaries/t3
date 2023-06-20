import type { WebhookRequiredHeaders } from "svix";
import { prisma } from "y/server/db";
import type { NextApiRequest } from "next";
import type { IncomingHttpHeaders } from "http";

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: Event = req.body;
  const eventType: EventType = body.type;
  const { id, ...attributes } = body.data;

  if (eventType === "user.created" || eventType === "user.updated")
    try {
      await prisma.user.upsert({
        where: {
          clerkId: id as string,
        },
        create: {
          clerkId: id as string,
          attributes,
          username: String(id),
        },
        update: {
          attributes,
        },
      });
    } catch (e) {
      console.error(e);
    }
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

type Event = {
  data: Record<string, string | number>;
  object: "event";
  type: EventType;
};

type EventType = "user.created" | "user.updated" | "user.deleted" | "*";
