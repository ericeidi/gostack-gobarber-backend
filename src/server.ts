import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import uploadConfig from './config/upload';

import './database';

const app = express();
const port = 3334;

app.use(bodyParser.json());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);


app.listen(port, () => {
    console.log('❤ server started on port',port)
})
