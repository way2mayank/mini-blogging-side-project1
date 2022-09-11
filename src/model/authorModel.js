const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({

    fname: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        maxlength: 25,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim:true
    }, email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true
    },
    password: {
        type: String,
        required: true
    }
},
    { timestamps: true });
module.exports = mongoose.model('AuthorBlogger', authorSchema)
