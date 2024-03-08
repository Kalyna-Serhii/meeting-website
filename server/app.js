import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import corsOptions from './src/cors/cors.config.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from './src/middlewares/error-middleware.js';
import {authRouter, friendRequestRouter, userRouter} from './src/routes/index.js';
import path from "path";
import {fileURLToPath} from "url";

const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api', authRouter, userRouter, friendRequestRouter);
app.use('/api/photos', express.static(path.join(__dirname, 'photos')));
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server listens http://${HOST}:${PORT}/`);
});
