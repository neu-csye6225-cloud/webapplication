import { Router } from 'express';
import * as assignmentController from '../controllers/assignmentController.js';
import { checkToken } from '../services/auth.js';

const router = Router();

router.get('/v1/assignments', checkToken, assignmentController.getAllAssignments);
router.post('/v1/assignments', checkToken, assignmentController.createAssignment);
router.get('/v1/assignments/:id', checkToken, assignmentController.getAssignmentById);
router.delete('/v1/assignments/:id',checkToken,assignmentController.deleteAssignment);
router.put('/v1/assignments/:id', checkToken, assignmentController.updateAssignment);
router.post('/v1/assignments/:id/submission',checkToken, assignmentController.submitAssignment);
export default router;