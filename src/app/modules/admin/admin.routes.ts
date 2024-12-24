import express from 'express'
import validateToken from '../../middleware/validateToken';
import { USER_ROLE } from '../user/constant';
import { blogcontroller } from '../blog/blog.controller';
import { userController } from '../user/user.controller';

const router = express.Router();


router.delete('/api/admin/blogs/:id', validateToken(USER_ROLE.admin), blogcontroller.deleteASingleBlog)

router.patch('/admin/users/:userId/block', validateToken(USER_ROLE.admin), userController.blockUser)

export const blogRoutes = router