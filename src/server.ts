import { Server } from 'http';
import app from './app';
import config from './config';

async function main() {
  const server: Server = app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server closed');
        process.exit(1);
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: Error) => {
    console.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}
main();
