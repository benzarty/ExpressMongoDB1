const mongoose = require('mongoose');
var Schema = mongoose.Schema; //bech gedou deifinition lil model mete3ena
var Contact = new
    Schema(
        {
            FullName: String,
            Phone: Number
        }
    ); 
    module.exports = mongoose.model('contacts',Contact);
        //esm lowel esmeha fil base w theni esm reel fil model 