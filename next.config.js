const path = require('path');

module.exports = {
    poweredByHeader: false,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        // Important: return the modified config

        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            SharedComponents: path.resolve(__dirname, "components"),
            Flux: path.resolve(__dirname, "flux"),
            Config: path.resolve(__dirname, "config"),
            Utils: path.resolve(__dirname, "utils"),
        };
        return config
    },
}