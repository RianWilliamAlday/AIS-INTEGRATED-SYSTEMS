import * as AuthController from '../controllers/authController.js';
import express from 'express';

const authRoutes = express.Router();

authRoutes.post('/register', AuthController.registerStudent);
authRoutes.get('/student/:id', AuthController.getStudent);

export default authRoutes;