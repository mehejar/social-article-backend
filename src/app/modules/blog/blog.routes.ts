import express from 'express'
import { blogcontroller } from './blog.controller';
import validateToken from '../../middleware/validateToken';
import { USER_ROLE } from '../user/constant';

const router = express.Router();

router.post('/', validateToken(USER_ROLE.user), blogcontroller.createBlog)
router.get('/', blogcontroller.getAllBlogs)
router.get('/:id', blogcontroller.getASingleBlogs)
router.patch('/:id', validateToken(USER_ROLE.user), blogcontroller.updateABlog)
router.delete('/:id', validateToken(USER_ROLE.user), blogcontroller.deleteASingleBlog)
router.delete('/api/admin/blogs/:id', validateToken(USER_ROLE.admin), blogcontroller.deleteASingleBlog)

export const blogRoutes = router