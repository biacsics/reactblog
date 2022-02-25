import logger from '../logger';
import * as ORM from 'typeorm';
import options from '../config';
import Blog from './entities/Blog';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const connectionOptions: ORM.ConnectionOptions = {
    name: 'default',
    type: 'postgres',
    host: options.dbHost,
    port: options.dbPort,
    username: options.dbUsername,
    password: options.dbPassword,
    database: options.dbDatabase,
    logging: ['info', 'log', 'info', 'warn', 'error'],
    synchronize: true,
    // dropSchema: process.env.NODE_ENV === 'production' ? false : true,
    entities: [Blog],
    namingStrategy: new SnakeNamingStrategy(),
    schema: 'public',
};

async function initialize(): Promise<void> {
    logger.info('Connecting to internal database...');

    await ORM.createConnection(connectionOptions);

    logger.debug('Successfully connected to internal database');
}

export default {
    initialize,
};
