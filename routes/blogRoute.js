import express from "express";
import formidable from "express-formidable";
import { requireSignIn } from "../middelwares/adminMiddleware.js";
import { blogIconController, createBlogController, deleteBlogController, getBlogController, getSingleBlogController, updateBlogController } from "../controllers/blogController.js";

const router = express.Router();

//routes
router.post("/create-blog", requireSignIn,formidable(), createBlogController);
//routes
router.put( "/update-blog/:_id", requireSignIn,formidable(),updateBlogController);

//get blogs
router.get("/get-blog", getBlogController);

//single blog
router.get("/get-blog/:_id", getSingleBlogController);

//get blog
router.get("/blog-photo/:_id", blogIconController);

//delete blog
router.delete("/delete-blog/:_id", deleteBlogController);


export default router;