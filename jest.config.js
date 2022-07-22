module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        "@exmpl/(.*)": "<rootDir>/src/$1"
    },
    transform: {
        ".(ts|tsx)": "<rootDir>/test/preprocessor.js"
      },
    testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    moduleFileExtensions: [
      "ts",
      "tsx",
      "js",
      "json"
    ],
    setupTestFrameworkScriptFile: "./test/unit/lib/setup.ts",
    verbose: true,
};
