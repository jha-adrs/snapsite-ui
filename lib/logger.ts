import { config } from '@/config/config';
import winston from 'winston';

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        enumerateErrorFormat(),
        config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message, metadata }) => {
            return `${timestamp} ${level}: ${message} ${metadata? JSON.stringify(metadata) : ''}`;
          }),
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ['error'],
        })
    ]
})

export default logger;