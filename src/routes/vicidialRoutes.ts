import { Router } from 'express';
import { sendNumber, updateLead, handleCallStatus } from '../controllers/vicidialController';

const router = Router();

router.post('/send-number', sendNumber);
router.put('/update-lead', updateLead);
router.post('/vicidial-call-status', handleCallStatus);

export default router;