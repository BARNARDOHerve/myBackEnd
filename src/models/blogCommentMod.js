import mongoose from 'mongoose';


const Comment = mongoose.model('Comment', new mongoose.Schema({
    commentSender: {
        email: String, 
    },
    commentBody: {
        type: String,
        required: true
    },
    blogId: {
        id: mongoose.Schema.Types.ObjectId
    }
}));
 
export default Comment;