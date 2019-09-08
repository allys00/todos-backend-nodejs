const Joi = require('joi');
const mongoose = require('mongoose');

//Simple schema
const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    _user_id: mongoose.Schema.Types.ObjectId,

    //give different access rights if admin or not 
    isAdmin: Boolean
});

const Todo = mongoose.model('Todo', TodoSchema);

//Function to validate a todo 
function validate(todo) {
    const schema = {
        title: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(5).max(255).required(),
    };

    return Joi.validate(todo, schema);
};

exports.Todo = Todo;
exports.validate = validate;