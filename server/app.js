import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import corsOptions from './src/cors/cors.config.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from './src/middlewares/error-middleware.js';
import {authRouter, userRouter} from './src/routes/index.js';

const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT;

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api', authRouter, userRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server listens http://${HOST}:${PORT}/`);
});
