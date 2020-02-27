const path = require('path')

module.exports = {
    webpack: (config, options) => {
        config.target =  'node';
        config.node = {
            __dirname: false
        }
        config.resolve.alias['~'] = path.resolve(__dirname);

        return config
    }
};
