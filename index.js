const express = require('express');

const app = express();
const path = require('path')
const pt = require('puppeteer');
const puerto = 3000
app.set('views', './views');
app.set('view engine', 'pug');


app.get('/c', async function (req,res){
    var url = req.query.url
    var w = Number(req.query.width)
    var h = Number(req.query.height)
    console.log(w,h)
    pt.launch().then(async browser => {
        //browser new page
        const p = await browser.newPage();
        //set viewpoint of browser page
        await p.setViewport({ width:w, height:h })
        await p.goto(url)
        //capture screenshot
        var img = await p.screenshot({
            encoding: "base64"
        });
       
        await browser.close()
        const opciones_pug = {
            imagen: "data:image/png;base64," +img
        }
        res.render('index', opciones_pug)
     })
})


app.get('/', function (req,res){
res.sendFile(__dirname + "/public/index.html")
})


app.listen(puerto, ()=> console.log(`Servidor iniciado en el puerto ${puerto}`))

