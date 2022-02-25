import packageJson from '../package.json';
import apiOptions from './config';
import logger from './logger';
import http from 'http';
import 'reflect-metadata';
import db from './db';
import api from './api';

const httpServer = new http.Server(api);

async function main(): Promise<void> {
    try {
        logger.info(`Version: ${packageJson.version}`);
        await db.initialize();

        httpServer.listen(apiOptions.apiPort, () => logger.info('Started on port %d', apiOptions.apiPort));
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
}

main().catch((e) => {
    console.error('TOP-LEVEL ERROR');
    console.error(e);
    logger.error('TOP-LEVEL ERROR', { error: e });
});

export { httpServer as http };
