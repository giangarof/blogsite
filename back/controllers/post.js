import Post from '../models/post.js'

const createPost = async(req, res) => {
    try{
        const post = new Post(req.body)
        await post.save()
        res.status(201).json(post);
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
        const {title, description} = req.body;
        const {id} = req.params;
        const post = await Post.findById(id)

        if(post){
            post.title = title;
            post.description = description;

            await post.save()
            res.send(post)
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
    deletePost
}