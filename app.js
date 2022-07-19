const fs = require('fs');
const path = require('path');
const http = require('http');


const server = http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');

    fs.readFile('./views/index.ejs', (err,data)=> {
        res.write(data);
        res.end();
    })
})


server.listen('3211', ()=> {
 console.log('Server start now start!!!')
})



