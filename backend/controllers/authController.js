const User = require("../models/User")
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

exports.register = async(req,res) =>{
    try{
        const {name,email,password,role} = req.body

        let existingUser = await User.findOne({email})
        
        if(existingUser){
            return res.status(400).json({"message":"User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = await User.create({
            name,
            email,
            password:hashedPassword,
            role
        })

        res.status(201).json({"message":"User Registered Successfully"})
    }catch(error){
        res.status(500).json({"message":"Server Error"})
    }
}


exports.login = async(req,res) =>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({"message":"Invalid Credentials"})
        }
        const match = await bcrypt.compare(password,user.password)

        if(!match){
            return res.status(400).json({"message":"Invalid Credentials"})
        }

        const token = jwt.sign({
            userId:user._id,
            role:user.role
        },process.env.JWT_SECRET,{
            expiresIn:"1h"
        })
        res.status(200).json({"message":"Login Successful","token":token,"role":user.role, "id":user._id})
    }catch(error){
        res.status(500).json({"message":"Server Error"})
    }
}