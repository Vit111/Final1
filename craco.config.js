const CracoLessPlugin = require('craco-less');

const antVariables = { '@primary-color': '#1DA57A' }

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: antVariables,
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}