import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';


import './database';

const app = express();
const port = 3334;

app.use(bodyParser.json());
app.use(express.json());
app.use(routes);


app.listen(port, () => {
    console.log('❤ server started on port',port)
})
