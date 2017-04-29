/**
 * Created by apoorvaagrawal on 19/03/17.
 */
var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var open = require('open');
var fs = require('fs');

require('./models/games');

var db = require('./config/database');

var port = process.env.PORT || 3000;
var app = express();


// Connect to Database =========================================================

mongoose.connect(db.url, function(err) {
    if(err) {
        console.log('problem connecting!');
    } else {
        console.log('connected to mongo');
    }
});


var Games = mongoose.model('Games');

var API_URL = '/api/games';


exports.start = function(PORT,STATIC_DIR,DATA_FILE){

    var app = express();

    app.use(logger('dev'));

    app.use(express.static(STATIC_DIR));

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({extended:true}));

    //API

    //reterive all games
    app.get(API_URL,function(req,res,next){

        //res.setHeader('Last-Modified', (new Date()).toUTCString());
        //console.log(storage.getAll());

        var searchTerm = req.query.search;
        console.log("searchTerm",searchTerm);
        var par={};
        if(searchTerm){
            searchGames(searchTerm,res);
        }else{
            allGames(res);
        }


    });


    //reterive search games

    function allGames(callback){
        console.log("allGames called");
        Games.find({},function(err,games){
            if(err){
                console.log(err);
            }
            console.log("allGames",games);
            callback.send(games);
        });

    };

    function searchGames(text,callback){
        console.log("searchGames called");
        var regexValue='\.*'+text+'\.*';
        Games.find({title:new RegExp(regexValue, 'i')},function(err,games){
            if(err){
                console.log(err);
            }
            console.log("searchGames",games);
            callback.send(games);
        });

    }



    // read the data from .csv and start the server

    //var csv = require("fast-csv");
    //
    //var stream = fs.createReadStream(DATA_FILE);
    ////cache
    //var gamesData = [];
    //
    //csv.fromStream(stream)
    //    .on("data",function(data){
    //        gamesData.push(data);
    //    })
    //    .on("end",function(data){
    //        console.log("Done");
    //    })
    //    .on("finish",function(){
    //        //remove first index from array
    //
    //        gamesData.shift();   // beacuse first index contains only headings of values
    //        gamesData.forEach(function(data){
    //            console.log("0/1/2/3/4",data[0],data[1],data[2],data[3],data[4]);
    //
    //
    //            var game = new Games({
    //                 title:data[0],
    //                 platform:data[1],
    //                 score:data[2],
    //                 genre:data[3],
    //                 editors_choice:data[4]
    //                });
    //            game.save(function(err,game){
    //
    //                if(err){
    //                    return next(err);
    //                }
    //                console.log("Game Saved ---------",game);
    //            });
    //
    //        });
    //        app.listen(PORT, function() {
    //            open('http://localhost:' + PORT + '/');
    //            // console.log('Go to http://localhost:' + PORT + '/');
    //        });
    //        //console.log("Length",storage.totalGames());
    //    })
    //
    app.listen(PORT, function() {
                    open('http://localhost:' + PORT + '/');
                    // console.log('Go to http://localhost:' + PORT + '/');
    });


}