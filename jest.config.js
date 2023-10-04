const config = (module.exports = {
  automock: false,
  clearMocks: true,
  coverageProvider: "v8",
  moduleDirectories: ["app", "node_modules", __dirname],
  moduleFileExtensions: ["js", "ts"],
  moduleNameMapper: {
    "pages/(.*)": "<rootDir>/app/pages/$1",
    "public/(.*)": "<rootDir>/app/public/$1",
    "backend/(.*)": "<rootDir>/app/backend/$1",
    "wix-storage": "<rootDir>/tests/fakes/storage",
    "wix-window": "<rootDir>/tests/fakes/window",
    "wix-location": "<rootDir>/tests/fakes/location",
    "wix-members": "<rootDir>/tests/fakes/members",
    "wix-auth": "<rootDir>/tests/fakes/auth",
    "wix-bookings.v2": "<rootDir>/tests/fakes/wix-bookings.v2",
    "wix-bookings-backend": "<rootDir>/tests/fakes/wix-bookings-backend",
    "wix-data": "<rootDir>/tests/fakes/wix-data",
    "wix-crm-backend": "<rootDir>/tests/fakes/wix-crm-backend",
    "wix-ecom-backend": "<rootDir>/tests/fakes/wix-ecom-backend",
    "wix-fetch": "<rootDir>/tests/fakes/wix-fetch",
    "wix-media-backend": "<rootDir>/tests/fakes/wix-media-backend",
    "wix-secrets-backend": "<rootDir>/tests/fakes/wix-secrets-backend",
    "public/API": "<rootDir>/tests/fakes/API",
  },

  preset: "ts-jest",

  roots: ["app", "tests"],

  setupFiles: ["./tests/fakes/jest.setup.ts"],

  testEnvironment: "node",

  testPathIgnorePatterns: ["/node_modules/"],
  testRegex: [".*.test.ts"],

  transform: {
    "\\.[t]s?$": "babel-jest",
  },
});
