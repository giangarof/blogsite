import Post from '../models/post.js'

export class PostController {

    async getAll  (req,res) {
        const keyword = req.query.keyword ? {tech: {$regex: req.query.keyword, $options: 'i'}} : {};
    
        try {
            const post = await Post.find({...keyword})
            // console.log(post)
            res.status(200).json(post)
        } catch (e) {
            res.send(e.message)
        }
    }
    
    async createPost (req, res) {
        try{
            const post = new Post(req.body)
            post.image = req.files.map(f => ({url: f.path, filename: f.filename, originalname:f.originalname}));
            if(!post.title || !post.description || !post.link || !post.tech || !post.repo || post.image.length == 0){
                return res.status(401).json({message: 'fill out all the fields'})
            }else{
                await post.save()
                console.log(post)
                return res.status(201).json({post, message:'Post created!'})
            }
            // if(!post){
            //     res.status(400).json({message: 'fill out'})
            // }
        } catch(e){
            return res.status(400).json({e, error: 'Please fill out all fields'})
            // res.send(e.message)
        }
    }
    
    async findPost (req,res) {
        try{
            const {id} = req.params;
            const post = await Post.findById(id)
            return res.send(post)
    
        } catch(e){
            return res.send(e.message)
        }
    }
    
    async updatePost (req,res) {
        const {id} = req.params;
        const {title, description, image, repo, link, tech} = req.body;
        // const post = await Post.findByIdAndUpdate(id, {...req.body})
        const post = await Post.findById(id)
    
        try{
            // Image update
            const imgs = req.files.map(f => ({
                url: f.path, 
                filename: f.filename, 
                originalname: f.originalname}));
                
                if(req.body.deleteImages){
                    for(let filename of req.body.deleteImages){
                        await cloudinary.uploader.destroy(filename)
                    }
                    await post.updateOne({$pull: {image: {filename: { $in: req.body.deleteImages}}}})
                    
                }
                
                // IF there is a previous image, 
                // This block of code will check if there is some
                // IF there is a previous IMG, but not a new one is provided, the previous one will prevail
    
                if (imgs.length > 0) {
                    post.image = imgs;
                }
                
                // Same here, if new title/description are provided, it'll update
                // IF not, it'll prevail the previous one
                if(post){
                    // post.image = imgs;
                    post.title = title;
                    post.description = description;
                    post.repo = repo;
                    post.link = link;
                    post.tech = tech;
        
                    const savedPost = await post.save()
                    return res.status(200).json({savedPost, message: 'Post updated successfuly'})
                } else {
                    // return res.status(404)
                    throw new Error('Resource not found')
                }
    
        }catch(e){
            // res.send(e.message)
            return res.status(400).json({e, error: 'Please dont leave fields empty.'})
        }
    }
    
    async deletePost (req, res) {
        try{
            const post = await Post.findById(req.params.id)
            if(!post) {
                return res.status(404).json({message:`Post doesn't exist!`})
            }
            if(post){
                await Post.deleteOne({_id: post._id})
                return res.status(200).json({message:`Post deleted!`})
            }
        }catch(e){
            return res.send(e.message)
        }
    }
}
