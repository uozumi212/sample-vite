export default {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@supabase|@vite)/)"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js",
    "@testing-library/jest-dom/extend-expect"
  ],
};

// module.exports = {
//   testEnvironment: "jsdom",
//   moduleNameMapper: {
//     "\\.(css|less)$": "identity-obj-proxy",
//     "^@/(.*)$": "<rootDir>/src/$1",
//   },
//   setupFilesAfterEnv: ["./jest.setup.js"],
//   transform: {
//     "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
//   },
//   transformIgnorePatterns: [
//     "/node_modules/(?!(@supabase|@vite)/)",
//   ],
// };
