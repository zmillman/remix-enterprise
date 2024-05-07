/**
 * Simplified email address parser
 */
export const parseEmail = (
  email: string
): { address: string; local: string; domain: string } => {
  // TODO: reject invalid emails

  const pieces = email.split("@", 2);

  return {
    address: email,
    local: pieces[0],
    domain: pieces[1],
  };
};
