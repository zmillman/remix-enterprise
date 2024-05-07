import { Authenticator } from "remix-auth";
import { commitSession, getSession, sessionStorage } from "./session.server";
import { GoogleStrategy } from "remix-auth-google";
import { redirect } from "@remix-run/server-runtime";
import { prisma } from "../utils/db.server";
import { findOrCreateGoogleUser } from "../models/google-user.server";

// We only store the user's id in the session - nothing else
interface SessionUser {
  id: string;
}

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<SessionUser>(sessionStorage, {
  sessionErrorKey: "auth-error",
  throwOnError: true,
});

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId) {
  throw new Error("You must provide a GOOGLE_CLIENT_ID");
}
if (!googleClientSecret) {
  throw new Error("You must provide a GOOGLE_CLIENT_SECRET");
}

const googleStrategy = new GoogleStrategy(
  {
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback",
    prompt: "select_account", // always ask the user to pick their account
  },

  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // Persist the user data to the DB using the tokens and profile
    const userId = await findOrCreateGoogleUser(prisma, {
      accessToken,
      refreshToken,
      extraParams,
      profile,
    });
    return { id: userId };
  }
);

authenticator.use(googleStrategy);

/**
 * Get the authenticated user, or redirect to `/login` if they're not signed in
 */
export const authenticatedUser = async (request: Request) => {
  const sessionUser = await authenticator.isAuthenticated(request);

  if (sessionUser) {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: sessionUser.id },
    });

    return user;
  } else {
    const session = await getSession(request.headers.get("Cookie"));
    session.flash(authenticator.sessionErrorKey, {
      message: "You must be signed in to view that page",
    });
    throw redirect("/login", {
      headers: { "Set-Cookie": await commitSession(session) }, // persist flash message
    });
  }
};
