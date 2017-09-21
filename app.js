var express = require("express");
var request = require("request");
var $ = require("jquery");
var bodyParser = require("body-parser");

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var key = "?VUJCJ4TYMG000000000000000";

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/results", function(req, res) {
  var query = req.query.search;
  var url = "https://www.cannabisreports.com/api/v1.0/strains/search/" + query + key;
  request(url, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render("results", {data: data});
      // res.send(body);
    }
  });
});

app.listen(process.env.PORT || "3000", function() {
  console.log("Server started.");
});
