/**
 * Created by apoorvaagrawal on 18/03/17.
 */
var PORT = process.argv[2] && parseInt(process.argv[2], 10) || 3000;
var STATIC_DIR = __dirname + '/../app';
var DATA_FILE = __dirname + '/data/games.csv';

require('./server').start(PORT, STATIC_DIR, DATA_FILE);
