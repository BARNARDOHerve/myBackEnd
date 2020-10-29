import mongoose from 'mongoose';


const contactCollection = mongoose.model('contacts', new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        minlength: 5,
        maxlength: 10000,
        required: true
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

export default contactCollection;