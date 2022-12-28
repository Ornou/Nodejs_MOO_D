const express= require('express')
const cors= require('cors')
let DB= require('./db/db.config')
const app= express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>res.send('I am online'))
app.get('*',(req,res)=>res.status(501).send('what the hell are you doing ?'))

DB.authenticate()
.then(()=>console.log('Database connected'))
.then(()=>{
app.listen(process.env.SERVER_PORT,()=>{
    console.log(`Serveur fonctionne sur port ${process.env.SERVER_PORT}`)
})})
.catch(err=> console.log('Database error',err))