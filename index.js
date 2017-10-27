var http = require('http');
var url = require('url');
var express = require('express')
var app = express();

const fs = require('fs'),
    path = require('path')
    

makePath = (name,folder) => {
    var res;
    if(folder){
        return path.join(__dirname,folder,name + ".html")
    } else {
        return path.join(__dirname,(name + ".html"))
    }
    
}    
app.get('/',(req,res ) => {
    res.sendFile(makePath('test'))
})
app.get('/draggables', (req,res) => {
    var path = makePath('draggables','www')    
    res.sendFile(path)
})

app.get('/tinymce', (req,res) => {
    var path = makePath('tinymce','www')    
    res.sendFile(path)
})

app.use('/css', express.static(__dirname + '/css'));
app.use('/src', express.static(__dirname + '/src'));
app.listen(9001);

console.log('Server started');