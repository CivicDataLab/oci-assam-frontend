const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const path = require('path');
// const withTM = require('next-transpile-modules')(['d3-fetch']);

function generateIncludes(modules) {
  return [
    new RegExp(`(${modules.join('|')})$`),
    new RegExp(`(${modules.join('|')})/(?!.*node_modules)`),
  ];
}

const includes = generateIncludes(['d3', 'd3-dsv', 'd3-fetch']);

module.exports = (phase, { defaultConfig }) => {
  const dms = process.env.DMS;
  const cms = process.env.CMS;
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    if (dms) {
      console.log('\nYou are running the app in dev mode');
      console.log('Happy coding ☀️\n');
    }
  }
  return {
    ...defaultConfig,
    webpack: (config, options) => {
      config.externals = config.externals.map((external) => {
        if (typeof external !== 'function') return external;
        return (context, request, callback) => {
          return includes.find((i) =>
            i.test(
              request.startsWith('.')
                ? path.resolve(context, request)
                : request
            )
          )
            ? callback() // i.e., not an external
            : external(context, request, callback);
        };
      });
      return config;
    },
    i18n: {
      locales: ['en', 'fr', 'nl-NL', 'te'],
      defaultLocale: 'en',
    },
    publicRuntimeConfig: {
      DMS: dms ? dms.replace(/\/?$/, '') : 'https://demo.ckan.org',
      CMS: cms ? cms.replace(/\/?$/, '') : 'oddk.home.blog',
    },
  };
};

// module.exports = {
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       issuer: {
//         test: /\.(js|ts)x?$/,
//         // and: [/\.(js|ts)x?$/],
//       },

//       use: ['@svgr/webpack'],
//     });

//     return config;
//   },
// };
