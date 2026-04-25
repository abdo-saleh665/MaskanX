import winstonObj from 'winston';
import 'winston-daily-rotate-file';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define severity based on environment
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

// Define colors
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winstonObj.addColors(colors);

// Log format
const format = winstonObj.format.combine(
  winstonObj.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winstonObj.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Transports (Console + rotating file)
const transports = [
  new winstonObj.transports.Console({
    format: winstonObj.format.combine(winstonObj.format.colorize({ all: true })),
  }),
  new winstonObj.transports.DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'error',
    maxFiles: '14d',
  }),
  new winstonObj.transports.DailyRotateFile({
    filename: 'logs/all-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
  }),
];

const logger = winstonObj.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger;
