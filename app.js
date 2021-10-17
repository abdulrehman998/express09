const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const path = require('path')
const mongoose = require ('mongoose')
var cors = require('cors')




mongoose.connect("mongodb+srv://armalik:1234@cluster0.ymiti.mongodb.net/test")
app.use(cors(["localhost:5000", "localhost:3000"]))
app.use(express.json())


app.use('/', express.static(path.join(__dirname, 'web/build')))


const User = mongoose.model('User',{
    name: String,
    email: String,
    password: String,
    created: {type: Date, default: Date.now}
});


app.get('/api/v1/profile', (req, res) => {

    User.find({}, (err, data)=>{
        res.send(data)
    })
})

app.post('/api/v1/profile',(req,res)=>{
    let newUser = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    newUser.save(() =>{
        console.log("data saved")
        res.send('Profile Created')
    })

})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})