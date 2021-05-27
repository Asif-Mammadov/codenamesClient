const path = require('path');
const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  sassOptions: {
    includePaths: [path.join(__dirname, 'app/styles')]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  }
};
