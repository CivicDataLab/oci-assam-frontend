const withTM = require('next-transpile-modules')(['echarts', 'zrender']);

module.exports = withTM({
  images: {
    domains: ['15.207.1.169'],
  },
});
