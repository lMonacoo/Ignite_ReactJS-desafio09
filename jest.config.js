module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/.next/'], // pastas que queremos ignorar nos testes
  setupFilesAfterEnv: [
    // array de arquivos que desejamos que o jest execute antes de executar os testes
    '<rootDir>/src/tests/setupTests.ts'
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest' // pegando os arquivos com aquelas extensões e o <rootDir> simboliza a pasta root do projeto
  },
  moduleNameMapper: {
    '\\.(scss|css|sass)$': 'identity-obj-proxy' // ira fazer o parse desses arquivos e converter de uma maneira que nosso código consiga entender
  },
  // indica em qual ambiente nossos testes estão executando, para saber como que o jest vai se comportar na hora criar o HTML ou o que ele precisa
  // para conseguir simular nossa aplicação e os componentes que estão ali dentro
  // o jsdom é uma forma nativa de fazer isso e ele basicamente cria uma representação da DOM em javascript, como se fosse um array - ele vem nativamente com o jest
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.tsx', '!src/**/*.spec.tsx', '!src/**/_document.tsx', '!src/**/_app.tsx'], // arquivos que queremos monitorar
  coverageReporters: ['lcov', 'json']
};
