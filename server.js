import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import  cloudinary  from 'cloudinary';

import {body, validationResult } from 'express-validator';
import { validateIdPAram, validateTest } from './middleware/validationMiddleware.js';


//routers
import jobRouter from './routers/jobRouter.js';
import authRouter from './routers/authRouter.js'; 
 import userRouter from './routers/userRouter.js';

 
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import {authenticateUser} from './middleware/authMiddleware.js';
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
//commented because of not using in local
//app.use(express.static(path.resolve(__dirname,'./public')));
app.use(express.static(path.resolve(__dirname,'./client/dist')));


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }


app.use(cookieParser());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/v1/test', (req, res) => {
  res.json({msg: 'Hello World'});
});

app.post('/api/v1/test',validateTest,

(req,res)=> {

  const {name} = req.body;
  res.json({message:`hello ${name}`})
});



app.use('/api/v1/jobs',authenticateUser,jobRouter);
app.use('/api/v1/users',authenticateUser, userRouter);

app.use('/api/v1/auth',authRouter)

app.get('*', (req,res)=>{
  res.send(path.resolve(__dirname, './client/dist','index.html'))
})
//middle ware has to be last one
//Not Found Middleware
//enable this after build
//  app.use("*", (req,res)=>{
//     res.status(404).json({ msg: 'not found' });

//  });


 //Error middle ware
 app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try{
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });

} catch(error){
  console.log(error);
  process.exit(1);
}



