const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require('config');

const itemsRouter = require("./routes/api/items");
const usersRouter = require("./routes/api/users");
const authRouter = require("./routes/api/auth");

const app = express();

// Bodyparser middleware

app.use(express.json());

// DB config

const db = config.get('mongoURI');

// Connect to mongo

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Mongo connnected"))
  .catch(err => console.log(err));

// Routes

app.use("/api/items", itemsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

// Server static assets if in production

if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server started on port ${port}`));
