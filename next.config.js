const withTM = require('next-transpile-modules')(['echarts', 'zrender']);

module.exports = withTM({
  images: {
    domains: ['15.206.122.72'],
  },
});
