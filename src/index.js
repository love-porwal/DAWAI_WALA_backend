const express=require("express");

const cors = require("cors");

const connect = require("./confige/db");

const productController=require("./controllers/product.controller");
const addressController=require("./controllers/address.controller");
const { register, login } = require("./controllers/user.controller");
const User=require("./models/user.model");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/products",productController);
app.use("/address",addressController);

// /register
app.post("/register", register);
app.post("/register/login",async (req,res) => {
  try{
      const user=await User.findOne({ mobile: req.body.mobile,password:req.body.password,email:req.body.email }).lean().exec();
      if(user!==null){
        return res.send(user);
      }else{
        return res.send("null");
      }
  }catch(err){
    return res.send(err.message);
  } 
})
// .login
app.post("/login", login);

app.get("/", async(req, res)=>{
  try{
    return res.send("Welcome to Login Page")
  }
  catch(err){
    return res.send(err.message);
  }
})

const port = process.env.port;
app.listen(port, async () => {
    try{
        await connect();
        console.log(`server is running at port ${port}`);
    }catch(err){
      console.log(err.message);
    }
})