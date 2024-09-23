import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, errors } = format;

// Define custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`; // Handle errors with stack trace
});

// Create the logger
const logger = createLogger({
  level: 'info', // Default level for logging
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }), // Capture stack trace for errors
    logFormat
  ),
  transports: [
    new transports.Console(),  // Log to console
    new transports.File({ filename: 'logs/error.log', level: 'error' }),  // Error logs
    new transports.File({ filename: 'logs/combined.log' })  // Combined logs
  ],
});

export default logger;