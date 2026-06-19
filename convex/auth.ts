import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

/**
 * Convex Auth configuration.
 *
 * Starts with email + password. To add OAuth (GitHub, Google, …) or magic
 * links, add the relevant providers here and set the matching env vars with
 * `npx convex env set`. See https://labs.convex.dev/auth.
 */
export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password],
});
