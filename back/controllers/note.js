import Note from '../models/note.js'

const getAll = async (req,res) => {
    try {
        const note = await Note.find({})
        console.log(note)
        res.status(200).json(note)
    } catch (e) {
        res.send(e.message)
    }
}

const create = async(req,res) => {
    const note =  new Note(req.body)
    await note.save()
    res.send(note)
}

export{
    getAll,
    create
}