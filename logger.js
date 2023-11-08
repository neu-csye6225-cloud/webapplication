import winston from 'winston/lib/winston/config/index.js';
import { createLogger,format,transports } from 'winston';

import fs from 'fs'
import path from 'path';

const logDirectory = 'logs'; // Path to the log directory

// Ensure the log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
// Create a new logger instance
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.File({
      filename: path.join(logDirectory, 'app.log'), // Specify the log file path
      level: 'info',
    }),
  ],
});

export default logger;