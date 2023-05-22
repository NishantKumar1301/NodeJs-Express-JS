const fs = require('fs');
const path = require('path');
const express = require('express');
const { fileURLToPath } = require('url');

const app = express();

app.set('views',path.join(__dirname,'views'));//for setting it in to ejs file:Which generates html
app.set('view engine','ejs');

app.use(express.static('public'));//==> For acessing the styles and java script files

app.use(express.urlencoded({extended:false}));

app.get('/index',function(req,res){
    // const filePath = path.join(__dirname,'views','index.html');
    // res.sendFile(filePath);
    res.render('index');// WIth the help of ejs
});

app.get('/recommend',function(req,res){
    res.render('recommend');
});

app.post('/recommend',function(req,res){
    const restaurant = req.body;
    const filePath = path.join(__dirname,'data','restaurant.json');

    const fileData = fs.readFileSync(filePath);

    const storedrestaurant = JSON.parse(fileData);

    storedrestaurant.push(restaurant);

    fs.writeFileSync(filePath,JSON.stringify(storedrestaurant));

    res.redirect('/confirm');
})

app.get('/restaurants',function(req,res){
    const filePath = path.join(__dirname,'data','restaurant.json');

    const fileData = fs.readFileSync(filePath);

    const storedrestaurant = JSON.parse(fileData);

    res.render('restaurants',{numberOfRestaurant :storedrestaurant.length,Restaurants : storedrestaurant});
    //Note : Restaurants refer to the name which is created in restaurant.ejs file inside the for loop and it refers to the storedrestaurant;
});

app.get('/about',function(req,res){
    res.render('about');
});

app.get('/confirm',function(req,res){
    res.render('confirm');
})

app.listen(3000);