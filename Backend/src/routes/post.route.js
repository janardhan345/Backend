import { Router } from "express";
import { createPost } from "../controllers/post.controllers.js";

const router = Router();

router.route('/create').post(createPost);

export default router;