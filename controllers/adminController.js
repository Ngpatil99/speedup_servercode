import { comparePassword, hashPassword } from "../helpers/adminHelper.js"
import admin from  "../models/adminModel.js"
import JWT from "jsonwebtoken"
 
 export const registerController =async(req,res)=>{
    try{

        const {name,email,password,answer}=req.body

        if(!name){
            return res.send({message:'Name is Required'})
        }
        if(!email){
            return res.send({message:'Email is Required'})
        }
        if(!password){
            return res.send({message:'Password is Required'})
        }
        if(!answer){
            return res.send({message:'Answer is Required'})
        }
        // check user
        const existingUser = await admin.findOne({email})
        // existing user
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:'Already Register Please Login'
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)

        //save data

        const user = await new admin({name,email,answer,password:hashedPassword}).save()
        res.status(201).send({
            success:true,
            message:"User Register Successfully",
            user,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
 }

 export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).send({
                success: false,
                message: "Invalid email or password"
            });

        // check user 
        const user = await admin.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            });
        }
        
        const match = await comparePassword(password, user.password); // Compare the provided password with the user's password
        if (!match) {
            return res.status(401).send({
                success: false,
                message: "Invalid Password"
            });
        }
        
        // Generate token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_Secret);
        res.status(200).send({
            success: true,
            message: "Login Successful",
            admin: {
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error: error.message // Send only error message in response
        });
    }
};
 //forgotPasswordController

export const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      if (!answer) {
        res.status(400).send({ message: "answer is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      //check
      const user = await admin.findOne({ email, answer });
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const hashed = await hashPassword(newPassword);
      await admin.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };
  

 export const testController =async(req,res)=>{
    res.send("Protected Route")
 }