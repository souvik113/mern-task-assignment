const User = require("../models/User")

exports.getAllUsers = async(req,res) =>{
    const users = await User.find({
        role:{
            $in:["manager","employee"]
        }
    })
    res.json(users)
}

exports.deleteUsers = async(req,res) =>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).json({"message":"User not found"})
        }
        res.json({"message":"User deleted successfully"})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}