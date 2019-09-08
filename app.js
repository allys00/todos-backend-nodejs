const express = require("express");
const requireDir = require('require-dir');

class AppController {
    constructor() {
        this.express = express();

        this.middlewares();
    };

    middlewares() {
        this.express.use(express.json());
    };

    routes() {
        this.express.use(require('./src/routes/Auth.route'));
    };
};

module.exports = new AppController().express;