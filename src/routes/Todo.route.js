const express = require('express');
const router = express.Router();
const auth = require('../middleware/Auth');
const todoController = require('../controllers/Todo.controller');

router.post('/', auth, todoController.Create);
router.put('/:id', auth, todoController.Update);
router.get('/', auth, todoController.List);
router.get('/:id', auth, todoController.Read);
router.delete('/:id', auth, todoController.Remove);

module.exports = router;
