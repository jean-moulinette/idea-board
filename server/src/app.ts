import * as dotenv from 'dotenv';
import ideaBoardServer from 'src/bootstrap/server';

function main() {
  dotenv.config();

  // Global error handler for uncatched rejected promises
  if (process.env.NODE_ENV !== 'production') {
    process.on('unhandledRejection', (reason, rejectedPromise) => {
      const errorMsg = 'Unhandled promise rejection catched in server process';
      console.log(`\n${errorMsg}\n Promise: `, rejectedPromise, 'Reason: ', reason);
    });
  }

  ideaBoardServer.startServer();
}

main();
