import express from 'express'
import { userController } from './user.controller';

const router = express.Router();

router.post('/auth/register', userController.createUser)

export const userRoutes = router