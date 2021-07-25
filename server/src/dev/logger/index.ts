import winston, { format, transports } from 'winston';
import config from "../../config/env";

const logFormat = format.printf(
  info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`,
);

const log = winston.createLogger({
  level: config.logLevel,
  format: format.combine(
    format.label({ label: 'server' }),
    format.splat(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    // Format the metadata object
    format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),
    new transports.File({
      filename: 'logs/combined.log',
      format: format.combine(
        // Render in one line in your log file.
        // If you use prettyPrint() here it will be really
        // difficult to exploit your logs files afterwards.
        format.json(),
      ),
    }),
  ],
  exitOnError: false,
});

export default log;