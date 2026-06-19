import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isSignInPage = createRouteMatcher(["/signin"]);
const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

// While the marketing front end is built without a live Convex backend, the
// auth middleware would have no deployment to talk to. Fall back to a no-op
// pass-through when NEXT_PUBLIC_CONVEX_URL is not configured.
const authMiddleware = convexAuthNextjsMiddleware(
  async (request, { convexAuth }) => {
    const authed = await convexAuth.isAuthenticated();

    // Keep signed-in users out of the sign-in page.
    if (isSignInPage(request) && authed) {
      return nextjsMiddlewareRedirect(request, "/admin");
    }
    // Gate the admin/CMS area.
    if (isProtectedRoute(request) && !authed) {
      return nextjsMiddlewareRedirect(request, "/signin");
    }
  },
);

export default function middleware(
  request: NextRequest,
  event: Parameters<typeof authMiddleware>[1],
) {
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    return NextResponse.next();
  }
  return authMiddleware(request, event);
}

export const config = {
  // Run on everything except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
