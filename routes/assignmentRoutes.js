import { Router } from 'express';
import * as assignmentController from '../controllers/assignmentController.js';
import { checkToken } from '../services/auth.js';

const router = Router();

router.get('/v3/assignments', checkToken, assignmentController.getAllAssignments);
router.post('/v3/assignments', checkToken, assignmentController.createAssignment);
router.get('/v3/assignments/:id', checkToken, assignmentController.getAssignmentById);
router.delete('/v3/assignments/:id',checkToken,assignmentController.deleteAssignment);
router.put('/v3/assignments/:id', checkToken, assignmentController.updateAssignment);
router.post('/v3/assignments/:id/submission',checkToken, assignmentController.createSubmission);

export default router;
