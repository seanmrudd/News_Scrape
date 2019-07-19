var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var express = require("express");

var PORT = 3000;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./routes/routes");

app.use(routes);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news_scrape";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
  
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
  