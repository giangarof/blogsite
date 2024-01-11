import User from '../models/users.js'
import { generateToken } from '../config/generateToken.js'
import jwt from "jsonwebtoken";

// login user
// route: /api/user/login
// Post
const loginUser = async(req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        const token = generateToken(res, user._id)

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            message:`Welcome back, ${user.name}`,
            token: token
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
    
}

// registration for new user
// route: /api/user/signup
// POST
const signupUser = async(req,res) => {
    const {name, username, email, password} = req.body;

    try {
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
                isAdmin: newUser.isAdmin,
            })
        } else{
            res.status(400);
            throw new Error('Invalid information, try again later.')
        }
        
        console.log(newUser)
        
    } catch (error) {
        res.send(error.message)
    }
    
}

// logout
// route: /api/user/logout
// POST
const logoutUser = async(req,res) => {
    // req.logout(function(err) {
    //     if (err) { return next(err); }
    //     res.redirect('/login');
    //   });
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: 'Logged out successfully'})
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
    res.send('ok')
}

// profile update user
// route: /api/user/profile/:id
// PUT
const userUpdateProfile = async(req,res) => {
    res.send('profile user')
}


export {
    // signinUser,
    loginUser,
    logoutUser,
    signupUser,
    deleteUser,
    userProfile,
    userUpdateProfile,
}