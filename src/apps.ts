import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { createConnection } from 'typeorm';

import usersRoutes from './routes/users.routes';
import walletRoutes from './routes/wallet.routes';

export class App {
 
    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
        this.connect();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes() {
        this.app.use('/api/users', usersRoutes);
        this.app.use('/api/wallet', walletRoutes);
    }

    connect() {
        createConnection()
        .then(() => {
            console.log( `database connection created` );
        })
        .catch((error: Error) => {
            console.log(`Database connection failed with error ${error}`);
        });
    }

    views() {
        this.app.set("view engine", "ejs");
    }

    async listen() {
        await this.app.listen( this.app.get('port'), '0.0.0.0');
        console.log( `server started :${ this.app.get('port') }` );
    }

}