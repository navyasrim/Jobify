import  {Router} from 'express';


const router = Router()


import { getAllJobs, getJob, updateJob, delJob, createJob, showStats } from '../controllers/jobController.js';
import { validateJobInput, validateIdPAram } from '../middleware/validationMiddleware.js';
import {checkForTestUser} from '../middleware/authMiddleware.js';
//import { validateJobInput, validateIdPAram } from '../middleware/validationMiddleware.js';

//router.get('/', getAllJobs);
//another methid

router.route('/').get(getAllJobs).post(checkForTestUser,validateJobInput, createJob);
router.route('/stats').get(showStats);
router.route('/:id').get(checkForTestUser,validateIdPAram,getJob)
.patch(checkForTestUser,validateJobInput,validateIdPAram,updateJob)
.delete(checkForTestUser,validateIdPAram,delJob);

export default router;
