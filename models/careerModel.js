import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    job_description: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("career", careerSchema);