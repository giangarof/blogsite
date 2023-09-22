import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

import express  from "express";
import cookieParser from 'cookie-parser';
import connectDB from "./config/db.js";
import passport from 'passport';
import passportLocal from 'passport-local'
import session from 'express-session'

import User from './models/users.js';
import sessionConfig from './config/session.js';

// run mongodb
connectDB();

// routes
    // users
import user from './routes/user.js'

const port = process.env.PORT || 3000;
const app = express();

// body parser middleware
    //make sure to write the body parser middleware priot to the routes.
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// Create the session
app.use(session(sessionConfig));

//Passport middleware for authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api/user', user)

app.listen(port, () => console.log(`running on port ${port}`))