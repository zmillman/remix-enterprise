import { parseEmail } from "./email";

describe("parseEmail", () => {
  it("extracts address part", () => {
    expect(parseEmail("joe@sixpack.com").address).toBe("joe@sixpack.com");
  });

  it("extracts local part", () => {
    expect(parseEmail("joe@sixpack.com").local).toBe("joe");
  });

  it("extracts domain part", () => {
    expect(parseEmail("joe@sixpack.com").domain).toBe("sixpack.com");
  });
});
