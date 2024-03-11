import userModel from  "../models/userModel.js"


export const registerController =async(req,res)=>{
  try{

      const {name,email,phone,city}=req.body

      if(!name){
          return res.send({message:'Name is Required'})
      }
      if(!email){
          return res.send({message:'Email is Required'})
      }
      if(!phone){
          return res.send({message:'Phone is Required'})
      }
      if(!city){
          return res.send({message:'City is Required'})
      }
     
      // check user
      const existingUser = await userModel.findOne({email})
      // existing user
      if(existingUser){
          return res.status(200).send({
              success:true,
              message:'Already Register Please Login'
          })
      }

    
      //save data

      const user = await new userModel({name,email,phone,city}).save()
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


//get all users blocks
export const getUsersController = async (req, res) => {
    try {
      const user = await userModel.find({})
      res.status(200).send({
        success: true,
        counTotal: user.length,
        message: "All Career ",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in getting Blog",
        error: error.message,
      });
    }
  };


  //delete controller
export const deleteUserController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params._id)
    res.status(200).send({
      success: true,
      message: "User Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting User",
      error,
    });
  }
};