import { config } from '@/config/config';
import winston from 'winston';

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

const logger = winston.createLogger({
    level: config.env === 'development' ? 'debug' : 'info',
    format: winston.format.combine(
        enumerateErrorFormat(),
        winston.format.metadata(),
        config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(
            ({ level, message, timestamp, metadata }) =>
                `${timestamp} ${level}: ${message} ${Object.keys(metadata).length > 0 ? JSON.stringify(metadata) : ''}`
        )
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ['error'],
        }),
    ],
});

export default logger;