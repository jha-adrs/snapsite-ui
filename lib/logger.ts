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
            ({ level, message, timestamp, metadata }) => {
                try {
                    let msg = `${timestamp} [${level}] : ${message} `;
                    if (metadata) {
                        msg = `${msg} - ${JSON.stringify(metadata)}`;
                    }
                    return msg;

                } catch (error) {
                    return `${timestamp} [${level}] : ${message} `;
                }
            }
        )
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ['error'],
        }),
    ],
    exitOnError: false,
});

export default logger;