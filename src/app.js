const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')
const MongoStore = require ('connect-mongo')
const handlebars = require ('express-handlebars')
const sessionRouter = require ('./routes/sessions')
const viewRouter = require ('./routes/views')
const mongoose = require('mongoose')

const app = express()
const PORT = 8080

app.use(express.urlencoded({extend: true}))

const FileStorage = FileStore(session)

app.use(session({
store: /*new FileStorage({ path: "./sessions", ttl:100, retries:0 }),*/
 MongoStore.create({
    mongoUrl:"mongodb+srv://mconsuelobeckett:BtMrTH620ttG7XsN@cluster1.kji7jjj.mongodb.net/?retryWrites=true&w=majority",
mongoOptions:{ useNewUrlParser: true, useUnifiedTopology: true}, ttl: 15
}), 
secret:"secretConsuelo",
resave: true,
saveUninitialized: true,
cookie: {
 maxAge: 15 * 60 *1000,
},
}))

/*app.get("/session", (req, res)=>{
if( req.session.counter){
    req.session.counter++
    res.send(`you have visited the site ${req.session.counter} times.`)
}
else{
    req.session.counter =1
    res.send("welcome")
}
})*/

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "views")
app.set("view engine", "handlebars")


app.use('api/sessions', sessionRouter)
app.use('/', viewRouter)


/*
app.get('/check-session', (req, res) => {
    console.log(req.session);
    res.send('session data logged to console');
})

app.get("/logout", (req, res)=>{
    req.session.destroy(e=>{
        if(!e)res.send("logout")
        else res.send({status:"logout error", body:e})
    })
}) 

app.get("/login", (req, res)=>{
    const {userName, pass} = req.query
    if(userName !== "consuelo" || pass !== "1234"){
        return res.send("authentication failed")
    }
    req.session.user = userName
    req.session.admin = true

    res.send('successfull entrance')
})


//middleware auth
function auth(req,res,next){
if(req.session.user === "consuelo" && req.session.admin){
    return next()

}
return res.status(401).send("authentication failed")
}
 


//recibe middleware
app.get("/private", auth, (req,res)=>{
    
    res.send("SOS admin")
})
*/

mongoose.connect("mongodb+srv://mconsuelobeckett:BtMrTH620ttG7XsN@cluster1.kji7jjj.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("connected to the DB")
})
.catch(e => {
    console.error("Fail to connect to the BD", e)
}); 


/*
//rutas vista
app.get("/", (req, res)=>{
    res.send("home")
})


app.post("/setCookie",(req, res)=>{
const {user} = req.body
res.cookie('user', user, {maxAge: 10000})
res.send("Cookie created")
})

app.get("/getCookie", (req, res)=>{
    const userCookie = req.cookies.user
    console.log("Cookie", userCookie)
    res.send(userCookie)
    }); 
*/

/*
//metodo setear
app.get("/setCookie", (req, res)=>{
 res.cookie('ConsuCookie', "soy yo", {maxAge: 10000}).send("Cookie")
});

//metodo obtener
app.get("/getCookie", (req, res)=>{
res.send(req.cookies)
});

//metodo borrado
app.get("/deleteCookie", (req, res)=>{
res.clearCookie("ConsuCookie").send("Cookie deleted") 
});

//metodo firma
app.get("/setSignedCookie", (req, res)=>{
    res.cookie("Signed cookie","recived a signed cookie",{maxAge:10000, signed:true}).send("Cookie")

});
*/

app.listen (PORT , ()=>{ 
    console.log(`server listening on ${PORT}`)
 });

  