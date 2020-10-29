
import mongoose from 'mongoose';



const blogCollection = mongoose.model('Blogs', new mongoose.Schema({
    bTitle: {
        type: String,
        required: true
    },
    bContent: {
        type: String,
        required: true
    },
    bPublisher: {
        type: String,
        required: true
    },
    bPublishedDate: {
        type: Date,
        default: new Date()
    },
    bPhoto: {
        type: String,
        required: false
    },
    createAt:{
        type: Date,
        default: new Date()
    },
    modified:{
        type: Date,
        default: new Date()
    }
}));


export default blogCollection;