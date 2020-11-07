import mongoose from 'mongoose';
import Blog from '../models/blogMod.js';
import Comment from '../models/blogCommentMod.js';



export const addComment = async (req, res) => {
    try {
        const { commentBody } = req.body;
        const { email } = req.user;
        const { _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({error: 'Invalid ID'});

        const articleToComment = await Blog.findById({_id});
        if (!articleToComment) return res.status(404).json({error: 'No article with the given ID found!'});

        const newComment = new Comment({
            commentSender: { email },
            commentBody: commentBody,
            blogId: {_id}
        });
        const savedComment = await newComment.save();

        return res.status(200).json({message: 'Comment added successfully', savedComment})

    } catch (err) {
        return res.status(500).json({error: err.message})
    }
};

export const readComment = async (req, res) => {
    try {
        const { _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({error: 'Invalid ID'});

        const allComments = await Comment.find().where('blogId._id', {$eq: _id});
        if (allComments.length === 0) return res.status(404).json({error: 'No comments for this article yet!'});
        
        return res.status(200).json(allComments)
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
};
