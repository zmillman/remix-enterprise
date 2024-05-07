import { type PrismaClient } from "@prisma/client";
import { GoogleExtraParams, GoogleProfile } from "remix-auth-google";
import { parseEmail } from "../utils/email";

const GOOGLE_PROVIDER_ID = "google";

/**
 * Find an existing user or create a new one from Google OAuth info
 *
 * @returns id of the user
 */
export const findOrCreateGoogleUser = async (
  prisma: PrismaClient,
  {
    accessToken,
    refreshToken,
    extraParams,
    profile,
  }: {
    accessToken: string;
    refreshToken?: string;
    profile: GoogleProfile;
    extraParams: GoogleExtraParams;
  },
): Promise<string> => {
  if (profile.provider != "google") {
    throw new Error('Expected provider to be "google"');
  }

  const existingAccount = await prisma.userAccount.findUnique({
    where: {
      provider_providerAccountId: {
        provider: GOOGLE_PROVIDER_ID,
        providerAccountId: profile.id,
      },
    },
  });

  if (existingAccount) {
    return existingAccount.userId;
  } else {
    const profileEmail = profile.emails[0].value;
    const organization = await findOrCreateOrganization(prisma, {
      domain: parseEmail(profileEmail).domain,
    });

    const newAccount = await prisma.userAccount.create({
      data: {
        user: {
          create: {
            organizationId: organization.id,
            name: profile.displayName,
            email: profileEmail,
            image: profile.photos[0].value,
          },
        },
        type: "oidc", // Google is an OIDC provider (https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/google.ts#L143)
        provider: GOOGLE_PROVIDER_ID,
        providerAccountId: profile.id,
        refresh_token: refreshToken,
        access_token: accessToken,
        // expires_in is in seconds
        expires_at: new Date(Date.now() + extraParams.expires_in * 1000),
        token_type: extraParams.token_type,
        scope: extraParams.scope,
        id_token: extraParams.id_token,
      },
    });

    return newAccount.userId;
  }
};

const findOrCreateOrganization = async (
  prisma: PrismaClient,
  { domain }: { domain: string },
) => {
  const existingOrganization = await prisma.organization.findUnique({
    where: {
      domain: domain,
    },
  });
  if (existingOrganization) {
    return existingOrganization;
  } else {
    return prisma.organization.create({ data: { domain } });
  }
};
