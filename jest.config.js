module.exports = {
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$":
      "<rootDir>/src/components/card-validator/__mocks__/styleMock.js"
  },
  testEnvironment: "jsdom" // если тестируете DOM-элементы
};
