const path = require('path');

module.exports = {
  webpack: function (config, env) {
    const lessRule = {
      test: /\.less$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
    };

    // Find the existing rule for .css files
    const cssRuleIndex = config.module.rules.findIndex(
      (rule) => rule.test && rule.test.toString() === '/\\.css$/'
    );

    // Insert the lessRule before the existing .css rule
    config.module.rules.splice(cssRuleIndex, 0, lessRule);

    return config;
  },
};
