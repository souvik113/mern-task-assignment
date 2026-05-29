const Task = require("../models/Task")

exports.createTask=async(req,res)=>{
    try{
        const task = await Task.create({
            ...req.body,
            createBy:req.user.id
        })
        res.status(201).json(task)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


exports.getAllTasks=async(req,res)=>{
    try{
        const tasks= await Task.find().populate("assignedEmployee","name email")
        res.json(tasks)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


exports.updatetask = async(req,res)=>{
    try{
        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!task){
            return res.status(404).json({"message":"Task not found"})
        }
        res.json(task)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


exports.deletetask = async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).json({"message":"Task not found"})
        }
        res.json({"message":"Task deleted successfully"})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.getTaskById = async(req,res)=>{
    try{
        const task = await Task.find({ assignedEmployee: req.params.id }).populate("assignedEmployee", "name email")
        if(!task){
            return res.status(404).json({"message":"Task not found"})
        }
        res.json(task)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.getTaskbyassignedEmployee = async(req,res)=>{
    try{
        const task = await Task.find({ 
            $or: [
        { createdBy: req.params.id },
        { assignedEmployee: req.params.id }
    ]
         }).populate("assignedEmployee", "name email")
        if(!task){
            return res.status(404).json({"message":"Task not found"})
        }
        console.log(task);
        res.json(task)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
