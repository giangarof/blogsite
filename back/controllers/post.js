import Post from '../models/post.js'

const getAll = async (req,res) => {
    try {
        const post = await Post.find({})
        console.log(post)
        res.status(200).json(post)
    } catch (e) {
        res.send(e.message)
    }
}

const createPost = async(req, res) => {
    try{
        const post = new Post(req.body)
        post.image = req.files.map(f => ({url: f.path, filename: f.filename}));
        await post.save()
        res.status(201).json(req.body)
    } catch(e){
        res.send(e.message)
    }
}

const findPost = async(req,res) => {
    try{
        const {id} = req.params;
        const post = await Post.findById(id)
        res.send(post)

    } catch(e){
        res.send(e.message)
    }
}

const updatePost = async(req,res) => {
    try{
        const {title, description, image} = req.body;
        const {id} = req.params;
        const post = await Post.findByIdAndUpdate(id)
        const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));

        const titleChanged = title !== post.title;
        const descriptionChanged = description !== post.description;
        if (!titleChanged && !descriptionChanged) {
            return res.status(400).json({ error: 'No changes were made.' });
        } else if(!post){
            throw new Error('something went wrong!')
        } else {
            post.title = title;
            post.description = description;
            post.image = imgs;
    
            const savedPost = await post.save()
            res.status(200).json({savedPost, message: 'Post updated successfuly'})

        }

    }catch(e){
        res.send(e.message)
    }
}

const deletePost = async(req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        if(post){
            await Post.deleteOne({_id: post._id})
            res.send(post)
        }
    }catch(e){
        res.send(e.message)
    }
}

export {
    createPost,
    findPost,
    updatePost,
    deletePost,
    getAll
}