const cheerio = require("cheerio");
const fs = require('fs');
const ejs = require ('ejs');
const express = require ('express'); 
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine","ejs"),
app.set("views","src"),
app.use(express.static('public')),
app.use("/css",express.static('asset/css')),
app.use("/img",express.static('asset/img')),
app.use("/js",express.static('asset/js')),
app.use("/surah/css",express.static('asset/css')),
app.use("/surah/img",express.static('asset/img')),
app.use("/surah/js",express.static('asset/js')),

ejs.delimiter = "?";

const description = `Project Islami Berbasis Online Tanpa Aplikasi Dan Tanpa Iklan,
Membaca <b>Qur'an,Tahlil Dan Do'a</b> Lebih Simpel.<br>
project ini masih beta,Jadi Harap Di maklumi bila mana masih ada bug.
`;
const title = "ɪꜱʟᴀᴍɪᴄ ᴏɴʟɪɴᴇ";

var data = fs.readFileSync('src/data/listsurah.json',`utf8`);
const surah = JSON.parse(data);

const ayah = id =>{
var data = fs.readFileSync(`src/data/surah/${id}.json`,`utf8`);
return JSON.parse(data);
}
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
res.render("layout",{layout:'home',menu})});
app.get('/allsurah', function (req, res){
res.render("layout",{layout:'allsurah',menu});
})
app.get('/surah/:id', function (req, res){
var x = ayah(req.params.id);
res.render("layout",{layout:'surah',menu,x});
})
app.get('/asmaul_husna', function (req, res){
res.render("layout",{layout:'asmaul',menu});
})
app.get('/tahlil', function (req, res){
res.render("layout",{layout:'tahlil',menu});
})
app.use('/', function (req, res){
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


app.listen(port, () =>{
  console.log("Server running.." + port);
});