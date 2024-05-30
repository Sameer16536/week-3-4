<<<<<<< HEAD
const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
mongoose.connect("mongodb+srv://sameermarathe15:sameer1482@cluster0.9ypdmcg.mongodb.net/")
const User = mongoose.model('Users',{
    name : String,
    email:String,
    password:String
})

app.post('/signup',async(req,res)=>{
    const email = req.body.email
    const name = req.body.name
    const password = req.body.password

    const existingUser = await User.findOne({email:email})
    if(existingUser){
        return res.status(400).send("User already exists")
    }
    const user = new User({
        name:name,
        email:email,
        password:password

    })
    user.save()
    res.json({
        msg:"User created successfully"
    })
})
app.listen(5000,()=>{console.log(`server is running at port 3000`)})
=======
const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
mongoose.connect("mongodb+srv://sameermarathe15:sameer1482@cluster0.9ypdmcg.mongodb.net/")
const User = mongoose.model('Users',{
    name : String,
    email:String,
    password:String
})

app.post('/signup',async(req,res)=>{
    const email = req.body.email
    const name = req.body.name
    const password = req.body.password

    const existingUser = await User.findOne({email:email})
    if(existingUser){
        return res.status(400).send("User already exists")
    }
    const user = new User({
        name:name,
        email:email,
        password:password

    })
    user.save()
    res.json({
        msg:"User created successfully"
    })
})
app.listen(5000,()=>{console.log(`server is running at port 3000`)})
>>>>>>> 4284f169dc50b33dac52dc86b6b1c2097e5d4287
