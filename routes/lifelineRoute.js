import express from "express";
import formidable from "express-formidable";
import { requireSignIn } from "../middelwares/adminMiddleware.js";
import { createlifelineController, deletelifelineController, getSinglelifelineController, getlifelineController, lifelinephotoController, updatelifelineController } from "../controllers/lifelineController.js";

const router = express.Router();

//routes
router.post("/create-lifeline",requireSignIn,formidable(),createlifelineController);
//routes
router.put(
  "/update-lifeline/:_id",requireSignIn,formidable(),updatelifelineController);

//get lifeline
router.get("/get-lifeline", getlifelineController);

//single lifeline
router.get("/get-lifeline/:_id", getSinglelifelineController);

//get photo
router.get("/lifeline-photo/:_id", lifelinephotoController);

//delete lifeline
router.delete("/delete-lifeline/:_id", deletelifelineController);


export default router;