import express from 'express'
import { blogcontroller } from './blog.controller';

const router = express.Router();

router.post('/', blogcontroller.createBlog)
router.get('/', blogcontroller.getAllBlogs)
router.get('/:id', blogcontroller.getASingleBlogs)
router.patch('/:id', blogcontroller.updateABlog)
router.delete('/:id', blogcontroller.deleteASingleBlog)

export const blogRoutes = router