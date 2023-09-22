import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    name:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // image: {
    //     type:String,
    // },

}, {timestamps:true})

// The next code will hash and validate the user password

// Validate the password
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

// Hash the password
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);
export default User;