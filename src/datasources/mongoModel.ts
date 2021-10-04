const mongoose = require('mongoose');

//Database Model
const todoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

const todoModel = mongoose.model('todoModel', todoSchema);
