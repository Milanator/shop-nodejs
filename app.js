const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// routes
app.use("/api/v1", require("./routes/product"));

// plugin
app.use(bodyParser.urlencoded({ extended: true }));

const port = 4000;

app.listen(port);

module.exports = app;
