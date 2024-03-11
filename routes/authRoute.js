import express from "express";
import {
  deleteUserController,
  getUsersController,
  registerController,
} from "../controllers/authController.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

router.get("/users",getUsersController)

router.delete("/deleteuser/:_id", deleteUserController);



export default router;