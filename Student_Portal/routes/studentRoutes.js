import express from 'express';
import * as StudentController from '../controllers/studentController.js';

const studentRoutes = express.Router();

studentRoutes.get('/search/:id', StudentController.searchStudentById);

export default studentRoutes;