import lifelineModel from "../models/lifelineModel.js";
import fs from "fs";

export const createlifelineController = async (req, res) => {
  try {
    const { title  } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !title:
        return res.status(500).send({ error: "Title is Required" });
      
      case photo && photo.size > 2000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const lifeline = new lifelineModel({ ...req.fields });
    if (photo) {
      lifeline.photo.data = fs.readFileSync(photo.path);
      lifeline.photo.contentType = photo.type;
    }
    await lifeline.save();
    res.status(201).send({
      success: true,
      message: "lifeline Created Successfully",
      lifeline,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing lifeline",
    });
  }
};

//get all lifline blocks
export const getlifelineController = async (req, res) => {
  try {
    const lifeline = await lifelineModel
      .find({})
      .select("-photo")
    res.status(200).send({
      success: true,
      counTotal: lifeline.length,
      message: "All lifelines ",
      lifeline,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting lifeline",
      error: error.message,
    });
  }
};
// get single lifeline block
export const getSinglelifelineController = async (req, res) => {
  try {
    const lifeline = await lifelineModel
      .findOne({ _id:req.params._id})
      .select("-photo")
    res.status(200).send({
      success: true,
      message: "Single lifeline Fetched",
      lifeline,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single lifeline",
      error,
    });
  }
};

// get photo
export const lifelinephotoController = async (req, res) => {
  try {
    const lifeline = await lifelineModel.findById(req.params._id).select("photo");
    if (lifeline.photo.data) {
      res.set("Content-type", lifeline.photo.contentType);
      return res.status(200).send(lifeline.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete lifeline controller
export const deletelifelineController = async (req, res) => {
  try {
    await lifelineModel.findByIdAndDelete(req.params._id).select("-photo");
    res.status(200).send({
      success: true,
      message: "lifeline Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting lifeline",
      error,
    });
  }
};

//upate Lifelne block
export const updatelifelineController = async (req, res) => {
  try {
    const { title , description } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !title:
        return res.status(500).send({ error: "Title is Required" });
      
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const lifeline = await lifelineModel.findByIdAndUpdate(
      req.params._id,
      { new: true }
    );
    if (photo) {
      lifeline.photo.data = fs.readFileSync(photo.path);
      lifeline.photo.contentType = photo.type;
    }
    await lifeline.save();
    res.status(201).send({
      success: true,
      message: "lifeline Updated Successfully",
      lifeline,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte lifeline",
    });
  }
};



// lifline block count
export const lifelineCountController = async (req, res) => {
  try {
    const total = await lifelineModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

