import { Router } from "express";
import { createPost, getPosts } from "../controllers/post.controllers.js";

const router = Router();

router.route('/create').post(createPost);
router.route('/getPosts').get(getPosts);

export default router;