const express= require("express");
const User =require ("./models/User")
const connect = require("./config/connectDB");
require('dotenv').config({ path: './config/.env' })

var app = express();
// Port definition
var PORT= process.env.PORT || 4000

connect();

app.use(express.json());

// CRUD
// define newuser
app.post("/add", async(req,res)=>{
    const {fullName,password,email,phone}=req.body;
    try {
        const newUser= new User({
            fullName,
            password,
            email,
            phone,  
        });
        await newUser.save();
        res.send(newUser);
    } catch (error) {
        console.log(error.message);
    }
});

// get user
app.get("/get", async(req,res)=>{
    try {
        const users=await User.find();
        res.send(users);
    } catch (error) {
        console.log(error);
    }
});

// get specified user
app.get('/get/:id',async(req,res)=>{
    try {
        const theUser= await User.findById(req.params.id);
        res.send(theUser);
        console.log(theUser);
    } catch (error) {
        console.log(error.message);
    }
});

// delete user
app.delete("/delete/:id", async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      res.send("Ammar 404");
    } catch (error) {
      console.log(error.message);
    }
  });

  // edit user
app.put("/edit/:id", async (req, res) => {
    try {
      const editUser = await User.findByIdAndUpdate(req.params.id,{...req.body},{new:true});
      res.send(editUser);
    } catch (error) {
      console.log(error.message);
    }
  });

// running server
app.listen(PORT, err=>err?console.log(err):console.log(`server is running on port ${PORT}` ));
