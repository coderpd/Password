const express=require ('express')
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken')
const mysql =require('mysql2')
const app=express();
const cors=require('cors')

//dbconnection

const db= mysql.createConnection(
  {
  host: 'authdbs.cxkmasyu8q0h.eu-north-1.rds.amazonaws.com', 
  user: 'admin',
  password: 'Dhinesh1801',
  database: 'authdb',
  port: 3306,
  connectTimeout: 20000  
  }
)

db.connect((err)=>{
  if(err) throw err;
  console.log("success")
})



//router:

const router=express.Router();
app.use(express.json());
app.use(cors());

//sign
router.post('/signup',async(req,res)=>{

  const {name,email,password}=req.body;
  const sql="insert into users (username,email,password) values(?,?,?)";
  const hashedPassword=await bcrypt.hash(password,10);
  db.query(sql,[name,email.hashedPassword],(err,result)=>{
    if(err) return res.status(400).json(err)
      res.json({message:"register successfully"})

  })

})


//login:

router.post("/login",(req,res)=>{
  const {email,password}=req.body;
  const sql="select * from users  where email =?"
  db.query(sql,[email],async(err,result)=>{
    if (err) return res.status(500).json(err);
    if (result.length===0) return res.status(404).json({message:"user not found"})
      const user =result[0]
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(404).json({message:"invalid "})
      const token=jwt.sign({id:user.id,email:user.email},"your_secret_key",{expiresIn:"1h"})
    res.json({token,user})
  })
})



app.listen(5000,()=>{
  console.log("server is running in port 5000")
})

module.exports=router;