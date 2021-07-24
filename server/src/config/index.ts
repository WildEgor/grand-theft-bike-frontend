const { getConfig } = require('convict-dotenv');

const config = {
    logLevel: {
        doc: 'The output log level',
        format: ['debug', 'info', 'error'],
        default: process.env.NODE_ENV === 'production'? 'error' : 'info',
        env: 'LOG_LEVEL',
      },
    env: {
        doc: 'The application environment',
        format: ['production', 'ote', 'test', 'development'],
        default: 'development',
        env: 'NODE_ENV',
    },
    server: {
        port: {
            doc: 'Server default port',
            format: 'port',
            default: 5000,
            env: 'PORT',
        }
    }
}

export default getConfig(config);