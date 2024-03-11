import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    city:{
        type:String,
        required:true
    },
    address: {
      type: String,
    },
   
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);