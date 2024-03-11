import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
   
    title: {
        type: String,
      },

    description: {
      type: String,
    },
    
    icon: {
      data: Buffer,
      contentType: String,
    },

  },
  { timestamps: true }
);

export default mongoose.model("blog", blogSchema);