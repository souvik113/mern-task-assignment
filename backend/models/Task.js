const mongoose=require("mongoose")

const taskSchema=new mongoose.Schema({

title:String,

description:String,

priority:{
type:String,
enum:["Low","Medium","High"]
},

status:{
type:String,
enum:[
"Pending",
"In Progress",
"Completed"
],
default:"Pending"
},

assignedEmployee:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

dueDate:Date

},{
timestamps:true
})

module.exports=mongoose.model(
"Task",
taskSchema
)