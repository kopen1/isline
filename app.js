'use strict'
const cheerio = require("cheerio");
const fs = require('fs');
const ejs = require ('ejs');
const express = require ('express'); 
const compression = require('compression'); 
const app = express();
const port = process.env.PORT || 8080;
var options = {
  dotfiles: 'ignore',
  etag: true,
  index : false,
  maxAge: 31536000,
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now()),
    res.set('power-by', "Qiro'ati, Islamic Online"),
    res.set('http-origin', "https://irkop.eu.org"),
    res.set('server', "HEROKU & GITHUB"),
    res.set('Cache-Control','max-age=31536000'),
    res.set('X-Powered-By', 'Irkop')
  }}

const hd = res => res.setHeader('Cache-Control','max-age=31536000');

app.set("view engine","ejs"),
app.set("views","src"),
app.use(express.static('asset/',options)),
app.use("/surah/",express.static('asset/',options)),
app.use(compression());


ejs.delimiter = "?";

const description = `Project Islami Berbasis Online Tanpa Aplikasi Dan Tanpa Iklan,
Membaca <b>Qur'an,Tahlil Dan Do'a</b> Lebih Simpel.<br>
`;
const title = "ɪꜱʟᴀᴍɪᴄ ᴏɴʟɪɴᴇ";

var data = fs.readFileSync('src/data/listsurah.json',`utf8`);
const surah = JSON.parse(data);

let ayah = "irkopkopen";
const asmaul =()=>{
var data = fs.readFileSync(`src/data/asmaul_husna.json`,`utf8`);
return JSON.parse(data);
}
const tahlil =()=>{
var data = fs.readFileSync(`src/data/tahlil.json`,`utf8`);
return JSON.parse(data);
}


var id = "kopen";
var menu = [title,description,surah,ayah,noarab,asmaul,tahlil];

app.get('/', function (req, res){
hd(res);
res.render("layout",{layout:'home',menu})});
app.get('/allsurah', function (req, res){
hd(res);
res.render("layout",{layout:'allsurah',menu});
})
app.get('/surah/:id',function (req, res){
hd(res);
var i = req.params.id;
var data = fs.readFileSync(`src/data/surah/${i}.json`,`utf8`);
var x = JSON.parse(data);
res.render("layout",{layout:'surah',menu,x});
})
app.get('/asmaul_husna', function (req, res){
hd(res);
res.render("layout",{layout:'asmaul',menu});
})
app.get('/tahlil', function (req, res){
hd(res);
res.render("layout",{layout:'tahlil',menu});
})
app.get('/source', function (req, res){
res.render("layout",{layout:'source',menu});
})
app.use('/', function (req, res){
hd(res);
res.render("layout",{layout:'home',menu})
});


function noarab(str){
let find = ['0','1','2','3','4','5','6','7','8','9'];
let replace = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    for (var i = 0; i < find.length; i++) {
        str = str.toString().replace(new RegExp(find[i], "g"), replace[i]);
    }
  return str;
}


app.listen(port, (err) =>{
  if(err) console.log(err)
  console.log("Server running.." + port);
});