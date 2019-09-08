const config = require("config");
const mongoose = require("mongoose");
const usersRoute = require("./src/routes/User.route");
const authRoute = require("./src/routes/Auth.route");
const todoRouter = require("./src/routes/Todo.route");
const express = require("express");
const app = express();

// use config module to get the privatekey, if no private key set, end the application
if (!config.get("myprivatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

//connect to mongodb
mongoose
  .connect("mongodb://localhost/nodeapi", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(express.json());
//use users route for api/users
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/todo", todoRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
exports.app = app;