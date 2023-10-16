import { json } from 'express';
import User from '../models/users.js'

const signinUser = (req,res) => {
    res.send(req)
}

// login user
// route: /api/user/login
// Post
const loginUser = async(req,res) => {
    try{
        // req.flash('success', `Welcome back ${req.body.username}`);
        // res.send('logged in');
        res.status(200).json({message:'Logged In'})

    } catch(e){
        res.send(e.message)
    }
    
}

// registration for new user
// route: /api/user/signup
// POST
const signupUser = async(req,res) => {
    const {name, username, email, password} = req.body;
    
    const userExistWithEmail = await User.findOne({email});
    if(userExistWithEmail){
        res.status(400)
        throw new Error('Email registered already, try a new one.')
    }

    const newUser = await User.create({
        name, username, email, password
    })

    if(newUser){
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        })
    } else{
        res.status(400);
        throw new Error('Invalid information, try again later.')
    }
}

// logout
// route: /api/user/logout
// POST
const logoutUser = async(req,res) => {
    req.logout();
}

// delete user from database
// route: /api/user/delete/:id
// DELETE
const deleteUser = async(req,res) => {
    res.send('delete user')
}

// profile user by id
// route: /api/user/profile/:id
// Get
const userProfile = async(req,res) => {
    res.send('profile user')
}

// profile update user
// route: /api/user/profile/:id
// PUT
const userUpdateProfile = async(req,res) => {
    res.send('profile user')
}


export {
    signinUser,
    loginUser,
    logoutUser,
    signupUser,
    deleteUser,
    userProfile,
    userUpdateProfile,
}