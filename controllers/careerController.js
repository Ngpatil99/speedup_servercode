import CareerModel from "../models/careerModel.js";


//ONLY PROBLEM IN CREATING CAREER BLOCK

export const createCareerController = async (req, res) => {
  try {
    const { title , job_description } = req.body;

    if (!title) {
      return res.status(400).send({ message: 'Title is Required' });
    }
    if (!job_description) {
      return res.status(400).send({ message: 'Job description is Required' });
    }

    // Save data
    const career = await CareerModel.create({ title, job_description });
    res.status(201).send({
      success: true,
      message: 'Career Created Successfully',
      career,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in creating Career Block',
      error: error.message,
    });
  }
};

//get all career blocks
export const getCareerController = async (req, res) => {
  try {
    const career = await CareerModel.find({})
    res.status(200).send({
      success: true,
      counTotal: career.length,
      message: "All Career ",
      career,
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
// get single career block
export const getSingleCareerController = async (req, res) => {
  try {
    const career = await CareerModel
      .findOne({ _id:req.params._id})
    res.status(200).send({
      success: true,
      message: "Single CareerBlock Fetched",
      career,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single CareerBlock",
      error,
    });
  }
};


//delete controller
export const deleteCareerController = async (req, res) => {
  try {
    await CareerModel.findByIdAndDelete(req.params._id)
    res.status(200).send({
      success: true,
      message: "CareerBlock Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting CareerBlock",
      error,
    });
  }
};

//upate career block
export const updateCareerController = async (req, res) => {
  try {
    const { title , job_description } =
      req.fields;
    //validation
    switch (true) {
      case !title:
        return res.status(500).send({ error: "Title is Required" });
      case !job_description:
        return res.status(500).send({ error: "Job Description is Required" });
    }

    const career = await CareerModel.findByIdAndUpdate(
      req.params._id,
      { new: true }
    );
   
    await career.save();
    res.status(201).send({
      success: true,
      message: "Career Updated Successfully",
      career,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte CareerBlock",
    });
  }
};



