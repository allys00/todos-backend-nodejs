const mongoose = require('mongoose');

module.exports = () => {
    return Promise.all(
        Object.keys(mongoose.models).map(key => {
            return mongoose.models[key].deleteMany({});
        })
    )
}