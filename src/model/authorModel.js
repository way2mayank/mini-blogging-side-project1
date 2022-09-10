const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({

    fname: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
        // pattern:/^[A-Z]{1}[a-z]+$/
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
        enum: ["Mr", "Mrs", "Miss"],
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
        required: true,
        minlength:6
    }
},
    { timestamps: true });
module.exports = mongoose.model('AuthorBlogger', authorSchema)
