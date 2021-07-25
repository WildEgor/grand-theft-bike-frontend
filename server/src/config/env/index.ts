require('dotenv').config();
import convict from 'convict';

const config = convict({
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
        },
        jwtValue: {
            doc: 'Server jwt',
            format: String,
            default: '',
            env: 'JWT_VALUE',
        }
    },
    // TODO: fix logger messages, when use prod it's allowed 'info' and 'error'!
    logLevel: {
        doc: 'The output log level',
        format: ['debug', 'info', 'error'],
        default: process.env.NODE_ENV === 'production'? 'error' : 'info',
        env: 'LOG_LEVEL',
    }
});
   
//const env = config.get('env');
//config.loadFile(`./config/env/${env}.json`);

//config.validate({ allowed: 'strict' }); // throws error if config does not conform to schema

export default config.getProperties(); // so we can operate with a plain old JavaScript object and abstract away convict (optional)