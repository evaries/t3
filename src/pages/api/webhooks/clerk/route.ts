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
  switch (eventType) {
    case "user.created":
      try {
        await prisma.user.create({
          data: {
            clerkId: id as string,
            attributes,
            username: String(id),
          },
        });
      } catch (e) {
        console.error(e);
      }
      break;

    case "user.updated":
      try {
        await prisma.user.update({
          where: { clerkId: id as string },
          data: {
            attributes,
          },
        });
      } catch (e) {
        console.error(e);
      }
      break;

    case "user.deleted":
      try {
        await prisma.user.delete({
          where: {
            clerkId: id as string,
          },
        });
      } catch (e) {
        console.error(e);
      }
      break;
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
