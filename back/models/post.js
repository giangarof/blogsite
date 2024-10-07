import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    // author: {
    //     id: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User"
    //     },
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    title:{
        type:String,
        required: false
    },
    description: {
        type:String,
        required:false
    },
    repo: {
        type:String,
        required:false
    },
    link: {
        type:String,
        required:false
    },
    tech: {
        type:String,
        required:false
    },
    image: [{url:String,filename:String,originalname:String}],
},{
    timestamps:true
})

const Post = mongoose.model('Post', postSchema);
export default Post;