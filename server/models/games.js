
var mongoose = require('mongoose');
//var Schema = mongoose.Schema;


//schema
var GamesSchema= mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    platform:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    editors_choice:{
        type:String,
        required:true
    }

});

var Games=mongoose.model('Games', GamesSchema,'Games');
module.export = Games;

