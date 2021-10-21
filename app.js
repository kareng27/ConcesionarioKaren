const express=require('express');
const morgan=require("morgan");
const app=express();
const path=require('path');
const session=require('express-session');
const colors=require('colors');
app.use(morgan("dev"));
app.set('port',process.env.PORT||3000)
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'vista'));
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:'123',
    resave:true,
    saveUninitialized:true
}));

app.use(require("./rutas/rutas"));
app.use((err,rep,res,next)=>{
    res.send({err:err.message})
})

/*const http=require('http');

const server=http.createServer((req,res)=>{
    console.log("En conexion")
    res.end("Conexion ok")
});


server.listen(3000,()=>{
    console.log("Esperando respuesta")
})*/

app.set('port',process.env.PORT || 3000);
app.listen(app.get('port'),()=>{

    console.log(`En el servidor ${app.get('port')}`)
})