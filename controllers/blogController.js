import blogModel from "../models/blogModel.js";
import fs from "fs";


export const createBlogController = async (req, res) => {
  try {
    const { title , description } =
      req.fields;
    const { icon } = req.files;
    //validation
    switch (true) {
      case !title:
        return res.status(500).send({ error: "Title is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      
      case icon && icon.size > 2000000:
        return res
          .status(500)
          .send({ error: "Icon is Required and should be less then 1mb" });
    }

    const blog = new blogModel({ ...req.fields });
    if (icon) {
      blog.icon.data = fs.readFileSync(icon.path);
      blog.icon.contentType = icon.type;
    }
    await blog.save();
    res.status(201).send({
      success: true,
      message: "Blog Created Successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing Blog",
    });
  }
};

//get all blogs
export const getBlogController = async (req, res) => {
  try {
    const blog = await blogModel
      .find({})
      .select("-icon")
    res.status(200).send({
      success: true,
      counTotal: blog.length,
      message: "All Blogs ",
      blog,
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
// get single blog
export const getSingleBlogController = async (req, res) => {
  try {
    const blog = await blogModel.findOne({ _id:req.params._id})
      .select("-icon")
    res.status(200).send({
      success: true,
      message: "Single Blog Fetched",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

//get Icon
export const blogIconController = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params._id).select("icon");
    if (blog.icon.data) {
      res.set("Content-type", blog.icon.contentType);
      return res.status(200).send(blog.icon.data);
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

//delete controller
export const deleteBlogController = async (req, res) => {
  try {
    await blogModel.findByIdAndDelete(req.params._id).select("-icon");
    res.status(200).send({
      success: true,
      message: "Blog Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Blog",
      error,
    });
  }
};

//upate Blog
export const updateBlogController = async (req, res) => {
  try {
    const { title , description } = req.fields;
    const { icon } = req.files;
    //validation
    switch (true) {
      case !title:
        return res.status(500).send({ error: "Title is Required" });
        case !description:
        return res.status(500).send({ error: "Description is Required" });
      
      case icon && icon.size > 2000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const blog = await blogModel.findByIdAndUpdate(
      req.params._id,
      { new: true }
    );
    if (icon) {
      blog.icon.data = fs.readFileSync(icon.path);
      blog.icon.contentType = icon.type;
    }
    await blog.save();
    res.status(201).send({
      success: true,
      message: "Blog Updated Successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte Blog",
    });
  }
};




// blog count
export const blogCountController = async (req, res) => {
  try {
    const total = await blogModel.find({}).estimatedDocumentCount();
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

