import { transports, format } from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as fs from 'fs';
import * as path from 'path';

export const LoggerFactory = (appName: string) => {
  const environment = process.env.NODE_ENV || 'development';
  const isProduction = environment === 'production';

  const logDir = isProduction
    ? '/tmp/logs' // Azure: writable directory
    : path.join(process.cwd(), 'logs'); // Local dev

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const DEBUG = process.env.DEBUG === 'false';
  const USE_JSON_LOGGER = process.env.USE_JSON_LOGGER === 'true';

  const commonFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.ms(),
  );

  const consoleFormat = USE_JSON_LOGGER
    ? format.combine(commonFormat, format.json())
    : format.combine(
        commonFormat,
        nestWinstonModuleUtilities.format.nestLike(appName, {
          colors: true,
          prettyPrint: true,
        }),
      );

  const fileFormat = USE_JSON_LOGGER
    ? format.combine(commonFormat, format.json())
    : format.combine(
        commonFormat,
        format.printf(({ level, timestamp, context, message }) => {
          return `[${timestamp}] ${level.toUpperCase()} [${
            context || appName
          }]: ${message}`;
        }),
      );

  // if (USE_JSON_LOGGER === 'true') {
  //   consoleFormat = format.combine(
  //     format.ms(),
  //     format.timestamp(),
  //     format.json(),
  //   );
  // } else {
  //   consoleFormat = format.combine(
  //     format.timestamp(),
  //     format.ms(),
  //     nestWinstonModuleUtilities.format.nestLike(appName, {
  //       colors: true,
  //       prettyPrint: true,
  //     }),
  //   );
  // }

  // return {
  //   level: DEBUG ? 'debug' : 'info',
  //   transports: [new transports.Console({ format: consoleFormat })],
  // };
  return {
    level: DEBUG ? 'debug' : 'info',
    transports: [
      new transports.Console({ format: consoleFormat }),
      new transports.File({
        filename: path.join(logDir, 'error.log'),
        level: 'error',
        format: fileFormat,
        maxsize: 5 * 1024 * 1024, // 5MB
        maxFiles: 5,
      }),
      new transports.File({
        filename: path.join(logDir, 'combined.log'),
        format: fileFormat,
        maxsize: 10 * 1024 * 1024, // 10MB
        maxFiles: 7,
      }),
    ],
  };
};
