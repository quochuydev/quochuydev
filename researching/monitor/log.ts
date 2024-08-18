import winston, { createLogger, format } from "winston";
import LokiTransport from "winston-loki";

const { combine, timestamp, printf } = format;

const customFormat = printf(({ timestamp, level, message }) => {
  return `${timestamp} | ${level}: ${message}`;
});

const hostName = "localhost";
const jobName = "jop-name";

const options = {
  format: combine(format.splat(), format.simple(), timestamp(), customFormat),
  transports: [
    new LokiTransport({
      format: winston.format.json(),
      host: `http://${hostName}:3100`,
      labels: {
        job: jobName,
      },
    }),
    new winston.transports.Console({
      format: combine(
        format.colorize(),
        format.splat(),
        format.simple(),
        timestamp(),
        customFormat
      ),
    }),
  ],
};

export const logger = createLogger(options);
