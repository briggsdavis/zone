import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isSignInPage = createRouteMatcher(["/signin"]);
const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  const authed = await convexAuth.isAuthenticated();

  // Keep signed-in users out of the sign-in page.
  if (isSignInPage(request) && authed) {
    return nextjsMiddlewareRedirect(request, "/admin");
  }
  // Gate the admin/CMS area.
  if (isProtectedRoute(request) && !authed) {
    return nextjsMiddlewareRedirect(request, "/signin");
  }
});

export const config = {
  // Run on everything except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
