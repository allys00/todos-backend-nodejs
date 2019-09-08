const { Todo, validate } = require('../models/Todo.model');

exports.Create = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) res.status(400).send({ error_message: error.details[0].message });

        const todo = new Todo({ ...req.body, _user_id: req.user._id });
        await todo.save();

        res.status(200).send({
            _user_id: req.user._id,
            _id: todo._id,
            completed: todo.completed,
            title: todo.title,
            description: todo.description,
            created_at: todo.created_at
        });
    } catch (error) {
        res.status(400).send({ error_message: error.message })
    }
};

exports.List = async (req, res) => {
    try {
        const todos = await Todo.find({ _user_id: req.user._id });
        res.status(200).send(todos)
    } catch (error) {
        res.status(400).send({ error_message: error.message })
    }
};

exports.Read = async (req, res) => {
    try {
        const _id = req.params.id
        const todo = await Todo.findOne({ _id });
        res.status(200).send(todo)
    } catch (error) {
        res.status(400).send({ error_message: error.message })
    }
};

exports.Remove = async (req, res) => {
    try {
        const _id = req.params.id
        const todo = await Todo.findOneAndDelete({ _id });
        if (todo) {
            res.status(200).send("success");
        } else {
            res.status(404).send({ error_message: 'Item não encontrado' });
        };
    } catch (error) {
        res.status(400).send({ error_message: error.message })
    }
};

exports.Update = async (req, res) => {
    try {
        const _id = req.params.id
        const todo = await Todo.findOneAndUpdate({ _id }, { ...req.body }, { new: true });
        if (todo) {
            res.status(200).send(todo);
        } else {
            res.status(404).send({ error_message: 'Item não encontrado' });
        };
    } catch (error) {
        res.status(400).send({ error_message: error.message })
    }
};
