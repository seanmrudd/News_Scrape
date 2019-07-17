var express = require("express");

var router = express.Router();

var axios = require("axios");

var cheerio = require("cheerio");

var db = require("../models/index");

router.get("/", function(req, res) {
    db.Article.find(function(data){
        var hbsObject = {data};
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
})

router.get("/scrape", function (req, res) {
    
    axios.get("https://news.google.com").then(function (response) {
        var $ = cheerio.load(response.data);

        $("article h3").each(function (i, element) {
            var result = {};

            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");

            db.Article.create(result).then(function (dbArticle) {
                console.log(dbArticle)
            }).catch(function (err) {
                console.log(err);
            });
        });
    });
});

router.get("/articles", function (req, res) {
    db.Article.find({}).then(function (dbArticle) {
        res.json(dbArticle);
    }).catch(function (err) {
        res.json(err);
    });
});

router.get("/articles/:id", function(req, res){
    db.Article.findOne({_id: req.params.id}).populate("note").then(function(dbArticle){
        res.json(dbArticle);
    }).catch(function(err){
        res.json(err);
    });
});

router.post("/articles/:id", function(req,res){
    db.Note.create(req.body).then(function(dbNote){
        return db.Article.findOneAndUpdate({_id:req.params.id}, {note: dbNote._id}, {new: true});
    }).then(function(dbArticle){
        res.json(dbArticle);
    }).catch(function(err){
        res.json(err);
    });
});

module.exports = router;