const express=require('express');
const app=express();
const userRoute=require('./routes/user');
const profileRoute=require('./routes/profile');
const paymentsRoute=require('./routes/payments');
const courseRoute=require('./routes/course');

const database=require('./config/database');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const {cloudinaryconnect}=require('./config/cloudinary');
const fileUpload=require('express-fileupload')
const dotenv=require('dotenv');

dotenv.config()
const PORT=process.env.PORT||4000
// data base connection
database.dbconnection();
app.use(express.json());
app.use(cookieParser);
app.use(
    cors({
        origin:"http://localhost3000",
        credentials:true,

    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:'/temp'
    })
)
// cloudniary connection
cloudinaryconnect()

app.use("/api/v1/auth",userRoute);
app.use("/api/v1/profile",profileRoute);
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/payment",paymentsRoute);

// 
app.get('/',(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running"
    })
})
app.listen(PORT,()=>{
    console.log(`App is running at:  ${PORT}`)
})