
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var GamesSchema = new Schema({

    title:String,
    platform:String,
    score:String,
    genre:String,
    editors_choice:String

});

var Games = mongoose.model('Games',GamesSchema);
module.export = Games;

