import mongoose from 'mongoose';


const blogComment = mongoose.model('blogComment', new mongoose.Schema({
    commentSender: {
        email: String 
    },
    commentBody: {
        type: String,
        required: true
    },
    blogId: {
        _id: mongoose.Schema.Types.ObjectId
    }
}));

export default blogComment;