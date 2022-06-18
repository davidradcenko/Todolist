module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        {
          name: '@storybook/addon-storysource',
          options: {
            loaderOptions: {
              injectStoryParameters: false,
            },
          },
        },
        '@storybook/preset-create-react-app',
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
        disableTelemetry: true, // 👈 Disables telemetry
    },
};


// module.exports = function ({ config }) {
//   config.module.rules.push({
//     test: /\.stories\.tsx?$/,
//     use: [
//       {
//         loader: require.resolve('@storybook/source-loader'),
//         options: { parser: 'typescript' },
//       },
//     ],
//     enforce: 'pre',
//   });
//
//   return config;
// };

