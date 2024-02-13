import { createRouteHandler } from "uploadthing/next-legacy";
import { ourFileRouter } from "y/server/uploadthing";


export default createRouteHandler({
  router: ourFileRouter,
  config: { logLevel: 'debug'},
});
