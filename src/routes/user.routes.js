import { Router } from "express";
import { register } from "../controllers/user.controller.js";


const router = Router();

router.get('/api/v1/register').post(register);

export default router;