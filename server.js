const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const express = require("express");
const exphbs = require("express-handlebars");

const PORT = 3000;

const app = express();
// mongoose.connect(process.env.MONGODB_URI || "mongodb://username:password1@ds255282.mlab.com:55282/heroku_n7pxcq6j", { useNewUrlParser: true });
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/news_scrape", { useNewUrlParser: true });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(routes);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
  
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
}); 
