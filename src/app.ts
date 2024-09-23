import express, { Request, Response } from 'express';
import cors from 'cors';
import expressWinston from 'express-winston';

import logger from './utils/logger.js';

import router from './api/index.js';

const app = express();


app.use(expressWinston.logger({
  winstonInstance: logger,
  meta: true, 
  msg: "HTTP {{req.method}} {{req.url}}", 
  expressFormat: true,  
  colorize: true, 
}));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) =>{
  res.status(200).json({
    massage:"hello  "
  })
});

app.use('/api/v1', router)

app.use(expressWinston.errorLogger({
  winstonInstance: logger
}));
// app.use('/api', router);


export default app;

