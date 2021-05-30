module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  },
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    '@elements/(.*)/(.*)$': '<rootDir>/app/components/elements/$1/$2',
    '@layouts/(.*)/(.*)$': '<rootDir>/app/components/layouts/$1/$2',
    '@modules/(.*)/(.*)$': '<rootDir>/app/components/modules/$1/$2',
    '@templates/(.*)/(.*)$': '<rootDir>/app/components/templates/$1/$2',
    '@constants/(.*)/(.*)$': '<rootDir>/app/constants/$1/$2',
    '@hooks/(.*)/(.*)$': '<rootDir>/app/hooks/$1/$2',
    '@utils/(.*)/(.*)$': '<rootDir>/app/utils/$1/$2'
  }
};
