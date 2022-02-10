const withTM = require('next-transpile-modules')(['echarts', 'zrender']);

module.exports = withTM({
  i18n: {
    locales: ['en', 'fr', 'nl-NL', 'te'],
    defaultLocale: 'en',
  },
  publicRuntimeConfig: {
    DMS: 'http://15.206.122.72/',
    CMS: 'https://oddk.home.blog',
  },
});
