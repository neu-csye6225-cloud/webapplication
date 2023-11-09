import winston from 'winston';
import path from 'path';

// Define the log directory path relative to the current directory
const logDirectory = path.join(__dirname, 'log');

// Create the logger with the log directory
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logDirectory, 'app.log')
    })
  ]
});

export default logger;