import express from "express";
import { addAdmin, getAdminById , adminLogin, getAdmins } from "../controllers/adminControllers.js";
 
const adminRouter=express.Router();
adminRouter.post("/signup",addAdmin);
adminRouter.post("/login",adminLogin);
adminRouter.get("/",getAdmins);
adminRouter.get("/:id",getAdminById);
export default adminRouter;