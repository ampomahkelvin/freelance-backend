import { configDotenv } from 'dotenv';
import development from './development';
import test from './test';
import production from './production';

configDotenv();

const defaults = {
    NODE_ENV: process.env.PROJECT_NODE_ENV,
    PORT: process.env.PROJECT_PORT,
    DATABASE_URL: process.env.PROJECT_DATABASE_URL,
    PAPERTRAIL_PORT: process.env.PROJECT_PAPERTRAIL_PORT,
    PAPERTRAIL_URL: process.env.PROJECTT_PAPERTRAIL_URL,
    APP_NAME: process.env.APP_NAME,
    DOMAIN: process.env.PROJECT_DOMAIN,
    SALT_ROUNDS: parseInt(process.env.PROJECT_SALT_ROUNDS as string),
    SECRET: process.env.PROJECT_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    MAILJET_API_KEY: process.env.MAILJET_API_KEY,
    MAILJET_API_SECRET: process.env.MAILJET_API_SECRET,
    CLIENT_URL: process.env.CLIENT_URL,
    EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
    EMAIL_ERROR_REPORTING: process.env.EMAIL_ERROR_REPORTING,
};

export default {
    development: { ...defaults, ...development },
    test: { ...defaults, ...test },
    production: { ...defaults, ...production },
}[process.env.PROJECT_NODE_ENV || 'development'];