import User from '../models/users.js'
import { generateToken } from '../config/generateToken.js'
import jwt from "jsonwebtoken";

export class UserController{

    async isIn(req,res) {
        try {
            res.status(200).json({message:'User identified.'})
        } catch (error) {
            res.status(401).json({message:'Looks like youre not admin and not even a identified user... go away!'})
        }
    }
    
    // login user
    // route: /api/user/login
    // Post
    async loginUser(req,res) {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        console.log(user)
        try {
    
            if(!user){
                return res.status(400).json({message:`Credentials doesn't found`})
            }
            if(!email || !password){
                return res.status(400).json({message:'Please, fill out all fields.'})
    
            }
            if(user && (await user.matchPassword(password))){
                const token = generateToken(res, user._id)
    
                return res.status(200).json({userProfile: user, _id: user._id, message: 'Welcome Back!'})
            }
            
        } catch (error) {
            return res.status(400).json({message:'Email or password are incorrect'})
            
        }
        
    }
    
    // registration for new user
    // route: /api/user/signup
    // POST
    async signupUser(req,res) {
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
    async logoutUser (req,res) {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        })
        return res.status(200).json({message: 'Logged out successfully'})
    }
    
    // delete user from database
    // route: /api/user/delete/:id
    // DELETE
    async deleteUser (req,res) {
        res.send('delete user')
    }
    
    // profile user by id
    // route: /api/user/profile/:id
    // Get
    async userProfile (req,res) { 
        
        // Query parameters or path parameters are more standard for GET requests.
        try {
            const userId = req.params.id
            // const user = await User.findById(userId).select('-password')
            const user = await User.findById(userId)
            if(!user){
                res.send(404)
            }else{
                res.status(200).json({user})
                return user;
            }
        } catch (error) {
            // Handle error (e.g., user not found)
            console.error('Error fetching user:', error);
            throw error; // Optionally rethrow the error
        }
    }
    
    // profile update user
    // route: /api/user/profile/:id
    // PUT
    async userUpdateProfile (req,res) {
        try {
            const {name, username, email, password, about} = req.body;
            const id = req.params.id
        
            const user = await User.findById(id)
            if(user){
                user.name = name;
                user.username = username;
                user.email = email;
                user.password = password;
                user.about = about;
                const update = await user.save()
                return res.status(201).send({message:'Profile updated successfully', update })
            } else {
                return res.status(400).send({error:'something went wrong in update controller.'})
        
            }
            
        } catch (error) {
            return res.send({message:error})
        }
    }
}