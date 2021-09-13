import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import User from './models/user.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended :true }))

const dbURI = "mongodb+srv://david:daveeys123@daveeys.zz47b.mongodb.net/rv?retryWrites=true&w=majority"

mongoose.connect(dbURI,{ useNewUrlParser : true , useUnifiedTopology : true, useFindAndModify: false }) // async funct
    .then((result)=>app.listen(5000,()=>console.log('Connection to db good, listening on port 5000...')))
    .catch((err)=>console.log)



app.get('/all-users',(req,res)=>{
    User.find() // Evry method of a mongoose schema is async
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>console.log(err))
})

//POST request to add to database
app.post('/add-user', (req,res)=>{
    const user = new User(req.body)

    user.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>console.log(err))
})

//DELETE
app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id

    User.findByIdAndDelete(id)
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>console.log(err))   
})

//UPDATE 
app.post(`/update/:id`,(req,res)=>{
    const id = req.params.id
    const body = req.body

    User.findByIdAndUpdate(id,body)
        .catch((err)=>console.log(err))
})