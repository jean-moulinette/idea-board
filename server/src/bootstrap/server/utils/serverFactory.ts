import 'colors';
import  * as express  from 'express';
// tslint:disable-next-line no-duplicate-imports
import { Express } from 'express';
import {
  RequestHandler,
  Request,
  Response,
} from 'express-serve-static-core';
import { Server } from 'http';
import { json } from 'body-parser';

import RequestFactory from 'src/bootstrap/server/utils/requestFactory';
import ResponseFactory from 'src/bootstrap/server/utils/responseFactory';
import { bootstrapRouter } from 'src/bootstrap/router/';
import { RouteHandler } from 'src/bootstrap/router/routes/utils/routeFactory';
import { HttpMethodNameLower } from 'src/bootstrap/router/constants';
import { RoutePath } from 'src/bootstrap/router/routes';

export default class ServerFactory {
  public app: Express;
  public server: Server;

  private port: string;

  public startServer() {
    const { env: { NODE_ENV } } = process;

    this.port = NODE_ENV === 'test'
      ? process.env.TEST_SERVER_PORT
      : process.env.SERVER_PORT || process.env.PORT;

    this.app = express();
    this.configureServer();

    this.server = this.listen();
  }

  public stopServer() {
    this.server.close();
  }

  public attachRouteHandler(
    httpMethod: HttpMethodNameLower,
    path: RoutePath,
    onRequest: RouteHandler,
  ) {
    this.app[httpMethod](path, (req: Request, res: Response) => {
      const response = new ResponseFactory(res);
      const request = new RequestFactory(req);
      onRequest(response, request.fetchData(httpMethod));
    });
  }

  private configureServer() {
    this.addMiddleWare(json());
    bootstrapRouter(this);
  }

  private addMiddleWare(middleware: RequestHandler) {
    this.app.use(middleware);
  }

  private listen(): Server {
    const port = this.port;
    const successMessage = `Server running on port: ${port}`.green;

    return this.app.listen(port, () => {
      console.log(successMessage);
    });
  }
}
