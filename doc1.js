const express = require('express')
const zod = require('zod')
const app = express()

const schema = zod.array(zod.number())


const schema2 = zod.object({
    email:zod.string(),
    password:zod.string().min(6),
    country:zod.literal("IN")
})

const validation = (obj)=>{
    const schema3 = zod.object({
        email:zod.string().endsWith('@gmail.com'),
        password:zod.string().min(6)
})
}

app.use(express.json())
//Middleware
//Count the number of request hit on the server
let count = 0;
const calculateReq = (req,res,next)=>{
    count++;
    console.log(count);
    next()
}


app.get("/health-checkup",calculateReq, (req, res) => {
    //Health checks
    const kidneyId = req.query.kidneyId;
    const username = req.headers.username;
    const password = req.headers.password;

    //Assume there is only one patient on the server
    if (username != 'sameer' || password != 'pass') {
        res.status(403).json({
            msg: "USer doesnt exist"
        });
        return;
    }
    if (username === 'sameer' && password === 'pass') {
        if (kidneyId == 1 || kidneyId == 2) {

            res.status(200).json({
                msg: "Kidney is Fine"
            });
        }

        return;
    }
})

//Login
app.post('/login',(req,res)=>{
    const user = validation(req.body)
    if(!user.success){
        res.json({msg:"Invalid Credentials"})
        return
    }
})

let errCount = 0;
//Global catches
app.use((err,req,res,next)=>{
    //Tracking Error Count
    errCount++
    console.error(err.stack);
    res.status(500).send('Something went wrong');
    res.json({msg:"Something is wrong with the server"})
    console.log(errCount)
})

app.post('/health-checkup',(req ,res)=>{
    //kidneys =[1,2]
    const kidneys = req.body.kidneys
    const response = schema.safeParse(kidneys)
    const kidneyLength = kidneys.length;
    
    if(!response.success){
        res.status(411).json({
            msg:"Input is Invalid"
        })
    }
    else{
        res.send({response}) 
    }

    res.send(`You have ${kidneyLength}kidneys`)
})

app.listen(5000)