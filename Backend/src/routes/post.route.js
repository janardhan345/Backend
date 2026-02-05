import { Router } from "express";
import { createPost, getPosts, updatePosts } from "../controllers/post.controllers.js";

const router = Router();

router.route('/create').post(createPost);
router.route('/getPosts').get(getPosts);
router.route('/update/:id').patch(updatePosts); 

export default router;