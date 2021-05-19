module.exports = {
  client: {
    service: {
      name: 'my-app',
      url: 'https://rickandmortyapi.com/graphql',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
};
