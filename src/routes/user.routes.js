import { Router } from "express";
import { register } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

// uploading to server through multer middleware berfore posting
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  register
);

export default router;
