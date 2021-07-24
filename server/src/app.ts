import express from "express";
import enableDestroy from "server-destroy";
import middleware from "./middlewares";
import config from "./config";
import log from "./dev/logger";

class App {
    public app: express.Application;
    private server: any;
    public logger: typeof log;

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.listen()
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