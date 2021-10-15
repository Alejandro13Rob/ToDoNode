import express from 'express';
import helmet from 'helmet';

const createServer = () => {
    const app = express();
    app.enable('trust proxy');
    app.use(express.json());
    app.use(
        helmet({
            contentSecurityPolicy:
                process.env.NODE_ENV === 'production' ? undefined : false,
        })
    );
    // CSS stuff
    app.use('/static', express.static('public'));
    app.use(express.urlencoded({ extended: true }));
    app.set('view engine', 'ejs');

    app.use('/', require('./routes/index'));
    app.use('/users', require('./routes/users'));

    return { app };
};

export { createServer };
