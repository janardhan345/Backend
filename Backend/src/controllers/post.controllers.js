import req from 'express/lib/request.js';
import { post } from '../model/post.model.js';

// create a post 

const createPost = async(req, res) => {
    try {
        const { name, description, age} = req.body;

        if(!name || !description || !age) {
             return res.status(400).json({
            message:"All fields are required"
        });
    }

        const newPost = await post.create({ name, description, age});

        res.status(201).json({
            message: "post created successfully",newPost
        });
    } catch (error) {
        res.status(500).json({
            message:"Internal server error", error
        });
    }
}

const getPosts = async(req,res) => {
    try {
        const posts = await post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message:"Internal server error", error
        });
    }
}

const updatePosts = async(req,res) => { 
    try {
        // edge case handling of empty body 
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                message: "Provided amount of data is not Enough."
            });
        }
        const updatedPost = await post.findByIdAndUpdate(req.params.id, req.body, {new:true});

        if(!updatedPost) return res.status(404).json({
            message:"Post not found"
        });

        return res.status(200).json({
            message:"Post updated successfully", post:updatedPost
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error", error
        });
    }
}

const deletePost = async(req, res) => {
    try {
        const deleted = await post.findByIdAndDelete(req.params.id);

        if(!deleted) return res.status(404).json({
            message:"Post not found", error
        });

        res.status(200).json({
            message:"Post successfully deleted",

        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error", error
        });
    }
}

export { createPost , getPosts, updatePosts, deletePost} ;