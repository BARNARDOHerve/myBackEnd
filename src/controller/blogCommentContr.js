import mongoose from 'mongoose';
import blogCollection from '../models/blogMod.js';
import blogComment from '../models/blogCommentMod.js';


export const addComment = async (req, res) => {
    try {
        const { commentBody } = req.body;
        const { email } = req.user;
        const { _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({error: 'Invalid ID'});
        const articleToComment = await blogCollection.findById({_id});
        if (!articleToComment) return res.status(404).json({error: 'No article with the given ID found!'});
        const newComment = new blogComment({
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
        const allComments = await blogComment.find().where('blogId._id', {$eq: _id});
        if (allComments.length === 0) return res.status(404).json({error: 'No comments for this article yet!'});
        return res.status(200).json(allComments)
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
};

// export const selectAllComment = async (req, res) => {
//     try {
//         const comments = await Comment.find().sort({ createdAt: -1 });
//         res.status(200).json({ comments });
        
//     }
//     catch (error) {
//         res.status(400).json(`Error: ${err}`);
//     }
// };

export const deleteComment = async (req, res) => {
    let { id } = req.params;
    if (id) {
        try {
        const existComment = await blogComment.find({ _id: id });
        
        if (existComment.length) {
                const deletedComment = await blogComment.deleteOne({ _id: id });
                res.status(200).send(`Comment is deleted ${existComment}`);
            } else {
                res.status(404).json({ status: 403, error: 'Comment Id does not exist' });
            }
        }
            catch (error) {
                throw new Error(error);
            }
    } else {
        res.status(403).json({ status: 403, error: 'Invalid comment Id' });
    }
};