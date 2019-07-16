var express = require("express");

var router = express.Router();

var axios = require("axios");

var cheerio = require("cheerio");

var db = require("../models/index");

router.get("/scrape", function (req, res) {
    axios.get("https://news.google.com").then(function(response) {
        var $ = cheerio.load(response.data);
        
        $("article h3").each(function(i, element) {
            var result = {};

            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");

            db.Article.create(result).then(function(dbArticle){
                console.log(dbArticle)
            }).catch(function(err){
                console.log(err);
            });
        })
    });
});

module.exports = router;