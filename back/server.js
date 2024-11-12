import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from "express";
import cookieParser from 'cookie-parser';
import connectDB from "./config/db.js";
import session from 'express-session'
// import connectFlash from 'connect-flash';

import User from './models/users.js';
import sessionConfig from './config/session.js';

// routes
import user from './routes/user.js'
import post from './routes/post.js'
import note from './routes/note.js'

// run mongodb
connectDB();

// const port = process.env.PORT || 3000;
const app = express();

// body parser middleware
// make sure to write the body parser middleware prior the routes.
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use('/api/user', user)
app.use('/api/post', post)
app.use('/api/note', note)

if(process.env.NODE_ENV === 'production'){
    const __dirname = path.resolve();
    //set static folder
    app.use(express.static(path.join(__dirname, 'front/dist')))
    //any route that is not api will be redirected to index.html
    app.use('/robots.txt', express.static(path.join(__dirname, 'robots.txt')));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'front', 'dist', 'index.html')))
} else {
    app.get('/', (req,res) => {
        res.send('API is running.')
    })
}

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`running on port ${port}`))