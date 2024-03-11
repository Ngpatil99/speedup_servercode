import mongoose from "mongoose";

const lifelineSchema = new mongoose.Schema(
  {
   
    title: {
        type: String,
      },
      
     photo: {
      data: Buffer,
      contentType: String,
    },

  },
  { timestamps: true }
);

export default mongoose.model("lifeline", lifelineSchema);