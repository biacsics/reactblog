const options = {
    apiPort: process.env.API_PORT || 5555,
    dbHost: process.env.API_DB_HOST || 'localhost',
    dbPort: parseInt(process.env.API_DB_PORT || '25432'),
    dbUsername: process.env.API_DB_USER || 'postgres',
    dbPassword: process.env.API_DB_PASSWORD || '4wesomePassword',
    dbDatabase: process.env.API_DB_DATABASE || 'postgres',
    logLevel: process.env.LOG_LEVEL || 'debug',
    logServiceName: 'backend',
    logPath: process.env.LOG_PATH || 'logs',
};

export default options;
