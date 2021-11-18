const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  const dms = process.env.DMS;
  const cms = process.env.CMS;
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    if (dms) {
      console.log('\nYou are running the app in dev mode');
    }
  }
  return {
    ...defaultConfig,
    i18n: {
      locales: ['en', 'fr', 'nl-NL', 'te'],
      defaultLocale: 'en',
    },
    publicRuntimeConfig: {
      DMS: dms ? dms.replace(/\/?$/, '') : 'http://13.126.46.107',
      CMS: cms ? cms.replace(/\/?$/, '') : 'oddk.home.blog',
    },
  };
};
