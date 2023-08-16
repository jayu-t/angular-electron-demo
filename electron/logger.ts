const { createLogger, format, transports } = (window as any).require('winston');
const path = (window as any).require('path');

const logger = createLogger({
  transports: new transports.File({
    filename:
      '/Users/jayeshtajane/Jayesh/42labs/angular-electron-demo/logs/electron.log',
    format: format.combine(
      format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      format.align(),
      format.printf(
        (info: any) => `${info.level}: ${[info.timestamp]}: ${info.message}`
      )
    ),
  }),
});

export default logger;
