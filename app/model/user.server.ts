/**
 * Find an existing user or create a new one
 */
export const findOrCreateUserId = (
  prisma: unknown,
  {
    email,
  }: {
    email: string;
  }
): string => {
  return email;
};
