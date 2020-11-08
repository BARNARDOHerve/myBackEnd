import mongoose from 'mongoose';


const blogCollection = mongoose.model('Blogs', new mongoose.Schema({
    bTitle: {
        type: String,
        required: true
    },
    bPublisher: {
        firstName: String,
        lastName: String
    },
    bContent: {
        type: String,
        required: true
    },
    createAt:{
        type: Date,
        default: new Date()
    }
}));


export default blogCollection;