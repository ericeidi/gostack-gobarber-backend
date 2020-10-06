import 'reflect-metadata';

import express, { Request, Response, NextFunction} from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import bodyParser from 'body-parser';
import uploadConfig from '../../../config/upload';
import AppError from '../../errors/AppError';

import '../Typeorm';
import '../../container';

const app = express();
const port = 3334;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    })
})


app.listen(port, () => {
    console.log('❤ server started on port',port)
})
