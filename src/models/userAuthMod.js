import mongoose from 'mongoose';

const User = mongoose.model('User', new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },  
   lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
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


export default User;