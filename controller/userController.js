const userSchema = require("../models/user");

const Add_InsertUser = async (req ,res ) => {
    
    const {username , email , password } = req.body
    const data = {
        username : username,
        email : email,
        password : password,
    }
    try {
        const check = await userSchema.findOne({email:email})
        if (check){
            return res.status(200).json("existe")
        }

        res.json("nonexiste")
        await userSchema.insertMany([data])

        
    } catch (error) {
        res.status(500).json("nonexiste")
    }
}
const updateUser = async (req , res) => {

    const { username ,password} = req.body
    try {
        const user = await userSchema.findByIdAndUpdate({_id : req.params.id} , {
            username : username,
            password : password
        },
        {new : true} )
        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json(error)
    }
}

const checkUser = async (req ,res ) => {
    
    const {email , password} = req.body
    try {
        const check = await userSchema.findOne({email:email})
        if (check){
            res.json(check)
            
        }
        else {
            res.json("nonexiste")
        }
    } catch (error) {
        console.log(error);
    }
}
const getUser = async (req ,res ) => {
    try {
        const check = await userSchema.findOne({_id:req.params.id})
        if (check){
            res.json(check)
        }
        else {
            res.json("nonexiste")
        }
    } catch (error) {
        console.log(error);
    }
}

const getAllUsers = async (req ,res ) => {
    try {
        const check = await userSchema.find({})
        res.json(check)
    } catch (error) {
        console.log(error);
    }
}


module.exports = {Add_InsertUser,checkUser , updateUser , getUser , getAllUsers}

