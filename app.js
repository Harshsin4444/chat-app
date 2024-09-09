const express = require('express');
const fs = require('fs');

const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res,next)=>{

    fs.readFile('username.txt', (err,data)=>{
        if(err){
            console.log(err);
            data= 'No chat Exists'
        }
        res.send(`
            ${data}<form action="/" onsubmit="document.getElementById('username').value=localStorage.getItem('username')" 
            method="POST">
            <input id="message" name="message" type="text" placeholder="message">
            <input type="hidden" name="username" id="username">
            </br>
            <button type="submit">Send</button>
            </form>
            `)
    })

})

app.post('/', (req,res,next)=>{
    console.log(req.body.username);
    console.log(req.body.message);
    fs.writeFile("username.txt", `${req.body.username} : ${req.body.message}` , {flag:'a'},(err) =>
        err ? console.log(err) : res.redirect('/')
            );
});


app.get('/login',(req,res,next)=>{
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/" method="GET"><input id="username" type="text" name="title"><button type="submit">add</button></form>');

})

app.listen(3000);