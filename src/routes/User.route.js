const express = require("express");
const router = express.Router();
const userController = require('../controllers/User.controller')

router.get("/current", userController.GetCurrentUser);
router.post("/", userController.CreateUser);

module.exports = router;