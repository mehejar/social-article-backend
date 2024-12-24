import express from 'express'
import { userController } from './user.controller';
import validateToken from '../../middleware/validateToken';
import { USER_ROLE } from './constant';
import validRequest from '../../middleware/validateRequests';
import { userValidation } from './user.validation';

const router = express.Router();

router.post('/auth/register', validRequest(userValidation.userValidationSchema), userController.createUser)

export const userRoutes = router