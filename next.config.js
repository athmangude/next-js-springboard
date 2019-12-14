const path = require('path');

module.exports = {
    poweredByHeader: false,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        // Important: return the modified config

        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            Assets: path.resolve(__dirname, "assets"),
            Components: path.resolve(__dirname, "components"),
            Config: path.resolve(__dirname, "config"),
            Flux: path.resolve(__dirname, "flux"),
            Layouts: path.resolve(__dirname, "layouts"),
            Utils: path.resolve(__dirname, "utils"),
        };
        return config
    },
}