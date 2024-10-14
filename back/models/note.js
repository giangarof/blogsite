import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
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
    about: {
        type:String,
        required:false
    },
    description: {
        type:String,
        required:false
    }
},{
    timestamps:true
});

const Note = mongoose.model('Note', noteSchema);
export default Note;