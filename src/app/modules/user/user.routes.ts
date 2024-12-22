import express from 'express'
import { userController } from './user.controller';
import validateToken from '../../middleware/validateToken';
import { USER_ROLE } from './constant';

const router = express.Router();

router.post('/auth/register', userController.createUser)
router.patch('/admin/users/:userId/block', validateToken(USER_ROLE.admin), userController.blockUser)

export const userRoutes = router