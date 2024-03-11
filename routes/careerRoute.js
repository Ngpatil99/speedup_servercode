import express from "express";
import { createCareerController, deleteCareerController, getCareerController, getSingleCareerController, updateCareerController } from "../controllers/careerController.js";
import { requireSignIn } from "../middelwares/adminMiddleware.js";

const router = express.Router();

//routes
router.post("/create-career",requireSignIn,createCareerController);
//routes
router.put("/update-career/:cid",requireSignIn,updateCareerController);

//get career
router.get("/get-career", getCareerController);

//single career
router.get("/get-career/:_id", getSingleCareerController);


//delete career
router.delete("/delete-career/:_id", deleteCareerController);


export default router;