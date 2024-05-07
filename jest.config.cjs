module.exports = {
  testEnvironment: "node",
  roots: [
    "<rootDir>/test", // TODO: move all test files next to their targets
    "<rootDir>/app",
  ],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
