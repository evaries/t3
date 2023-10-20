import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/dashboard"];

const isPrivate = (path: string) => {
  return privatePaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};
export default withClerkMiddleware((req: NextRequest) => {
  if (!isPrivate(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  const { userId } = getAuth(req);

  console.log("userid", userId);
  if (!userId) {
    const signInUrl = new URL("/", req.url);
    // signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
