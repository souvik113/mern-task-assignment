const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")

const connectDB=require("./config/db")
const authRoutes=require("./routes/authRoutes")
const userRoutes=require("./routes/userRoutes")
const taskRoutes=require("./routes/taskRoutes")

dotenv.config()

connectDB()
const app=express()

app.use(cors())
app.use(express.json())



app.use("/auth",authRoutes)
app.use("/users",userRoutes)
app.use("/tasks",taskRoutes)
app.listen(5001,()=>{

console.log("Server is Running")

})