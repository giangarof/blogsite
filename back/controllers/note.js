import Note from '../models/note.js'

const getAll = async (req,res) => {
    try {
        const note = await Note.find({})
        // console.log(note)
        return res.status(200).json(note)
    } catch (e) {
        return res.send(e.message)
    }
}

const create = async(req,res) => {
    const note =  new Note(req.body)
    await note.save()
    return res.send(note)
}

const getOneById = async(req,res) => {
    try {
        const {id} = req.params;
    
        const note = await Note.findById(id)
        if(!note){
            return res.status(404).json({message:`Note doesn't exist.`})
        }
        if(note){
            return res.status(200).json({data: note})
        }
        
    } catch (error) {
        return res.status(404).json({message: 'Something went wrong in the find by id path.'})
    }
}

const updateNote = async(req,res) => {
    try {
        const {id} = req.params
        const {title, description, about} = req.body
        const note = await Note.findById(id)

        if(!note){
            res.status(404).json({message:`Note doesn't exist.`})
        }
    
        if(note){
            note.title = title;
            note.about = about;
            note.description = description;
        }

        await note.save()
        return res.status(200).json({message:`Note updated successfully.`, data: note})
        
    } catch (error) {
        return res.status(404).json({message: 'Something went wrong in the update path.'})
    }
}

const deleteNote = async(req,res) => {
    try {
        const {id} = req.params;
        const note = await Note.findById(id)
        if(note){
            await Note.deleteOne({_id: note._id})
            return res.status(200).json({message:`Note deleted successfully.`, data: note})
        } else{
            return res.status(404).json({message:`Note doesn't exist.`,})
        }
    } catch (error) {
        return res.status(400).json({message:`Something went wrong in the delete path.`,})
    }
}

export{
    getAll,
    create,
    getOneById,
    updateNote,
    deleteNote
}