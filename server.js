const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Post = require('./models/post');
const Contact = require('./models/contact');
const postRoutes = require('./routes/post-routes');
const contactsRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const PORT = 3131;
const app = express();

const db = 'mongodb://localhost:27017/news';

app.set('view engine', 'ejs');

app.use(methodOverride('_method'));


mongoose
    .connect(db)
    .then((res)=> console.log('Connected to DB'))
    .catch((error)=> console.log(error))

app.get('/', (req, res)=>{
    res.render(createPath('index'))
});

//middleware
// app.use((req,res,next) => {
//     console.log(req.url);
//     console.log(req.method);
//     next();
// })

//Подсключаем статическсие файлы и разрешаем их видеть
//Данный метод помогает сделать папку общедоступной
app.use(express.static('styles'));

//для работы с формой
app.use(express.urlencoded({extended:false}));
app.get('/about', (req, res)=>{
    res.redirect('/contacts')
});

app.use(postRoutes);
app.use(contactsRoutes);

app.use((req,res)=> {
    res
        .status(404)
        .sendFile(createPath('error'))
})


app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});