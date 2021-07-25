import express from "express";
import enableDestroy from "server-destroy";
import { connect } from "mongoose";
import middleware from "./middlewares";
import config from "./config/env";
import log from "./dev/logger";
import Controller from "./interfaces/controller.interface";
class App {
    public app: express.Application;
    private server: any;
    private logger: typeof log = log;

    constructor(controllers: Controller[]) {
        this.app = express();

        this.initializeControllers(controllers);
        this.initializeMiddlewares();
        this.initializeLogger()
        this.connectToTheDatabase().then(() => this.listen()).catch((error) => this.logger.error('Connect MongoDB: %O', error))
    }

    private async connectToTheDatabase() {
        const {
            username,
            password,
            uri,
            port
        } = config.db;
        
        await connect(`mongodb://${username}:${password}${uri}:${port}`);
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
          this.app.use('/', controller.router);
        });
    }

    private initializeLogger() {
        this.logger = log;
    }

    private initializeMiddlewares() {
        middleware(this.app);
    }

    private listen() {
        this.server = this.app.listen(config.server.port, () => { this.logger.info('Listening on port: %s', config.server.port); })
        enableDestroy(this.server);
    }

    public shutDown() {
        this.logger.info('Received kill signal, shutting down gracefully');

        setTimeout(() => {
            this.logger.error('Could not close connections in time, forcefully shutting down');
            process.exit(1);
        }, 10000);
        
        this.server.destroy(() => {
            this.logger.info('Server succesfully closed!')
        });
    }
}

export default App;