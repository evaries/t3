import { createNextPageApiHandler } from "uploadthing/next-legacy";

import { ourFileRouter } from "y/server/uploadthing";

const handler = createNextPageApiHandler({
  router: ourFileRouter,
});

export default handler;
