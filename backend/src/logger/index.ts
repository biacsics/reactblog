import { createLogger, format, transports } from 'winston';
import loggerOptions from '../config';
import winston from 'winston';

export function createNamedLogger(name?: string): winston.Logger {
    const logger = createLogger({
        level: loggerOptions.logLevel,
        defaultMeta: {
            service: name || loggerOptions.logServiceName,
        },
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.errors({ stack: true }),
            format.splat(),
            format.json(),
        ),
        transports: [
            new transports.File({ filename: loggerOptions.logPath + '/error.log', level: 'error' }),
            new transports.File({ filename: loggerOptions.logPath + '/combined.log' }),
        ],
    });

    logger.add(
        new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
        }),
    );

    return logger;
}

const logger = createNamedLogger();

export default logger;
