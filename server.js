const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Post = require('./models/post')
const Contact = require('./models/contact')

const PORT = 3131;
const app = express();
const createPath = (page) => path.resolve(__dirname,'ejs-views', `${page}.ejs`);
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

app.post('/add-post',((req, res) => {
    const {title, author,text} = req.body;
    const post = new Post({title, author,text})
    post
        .save()
        .then((result) => res.redirect('/posts'))
        .catch((error)=> {
            console.log(error)
            res.render(createPath('error'))
        })
    // const post = {
    //     id:new Date(),
    //     date: (new Date()).toLocaleDateString(),
    //     title,
    //     author,
    //     text
    // }
    // res.render(createPath('post'),{post})
}))

app.get('/contacts', (req, res)=>{
    Contact
        .find()
        .then((contacts)=>{
            res.render(createPath('contacts'),{contacts})
        })
        .catch((error)=> {
            console.log(error)
            res.render(createPath('error'))
        })

    // const contacts = [
    //     {name:'Sergey', link:'https://www.geeksforgeeks.org/express-js-res-send-function/'},
    //     {name:'Anton', link:'https://www.geeksforgeeks.org/express-js-res-send-function/'},
    //     {name:'Artur', link:'https://www.geeksforgeeks.org/express-js-res-send-function/'},
    // ]
    // res.render(createPath('contacts'),{contacts})
});

app.get('/about', (req, res)=>{
    res.redirect('/contacts')
});

app.get('/post/:id', (req, res)=>{
    Post
        .findById(req.params.id)
        .then((post)=>{
            res.render(createPath('post'),{post})
        })
        .catch((error)=> {
            console.log(error)
            res.render(createPath('error'))
        })
});


app.get('/edit/:id', (req, res)=>{
    Post
        .findById(req.params.id)
        .then((post)=>{
            res.render(createPath('edit-post'),{post})
        })
        .catch((error)=> {
            console.log(error)
            res.render(createPath('error'))
        })
});

app.put('/edit/:id', (req, res)=>{
    const {title, author,text} = req.body;
    const {id} = req.params;
    Post
        .findByIdAndUpdate(id, {title, author,text})
        .then((post)=>{
            res.redirect(`/post/${id}`)
        })
        .catch((error)=> {
            console.log(error)
            res.render(createPath('error'))
        })
});



app.delete('/posts/:id', (req, res)=>{
    Post
        .findByIdAndDelete(req.params.id)
        .then((result)=>{
            res.sendStatus(200);
        })
        .catch((error)=> {
            console.log(error)
            res.render(createPath('error'))
        })
});


app.get('/posts', (req, res)=>{
    Post
        .find()
        .sort({createdAt: -1})
        .then((posts)=>{
            res.render(createPath('posts'),{posts})
        })
        .catch((error)=> {
            console.log(error)
            res.render(createPath('error'))
        })
});

app.get('/add-post', (req, res)=>{
    res.render(createPath('add-post'));
});

app.use((req,res)=> {
    res
        .status(404)
        .sendFile(createPath('error'))
})


app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});