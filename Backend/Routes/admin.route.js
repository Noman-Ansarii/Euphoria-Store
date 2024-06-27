import { Router } from 'express';
import { assignAdminRole } from '../Controllers/index.controllers.js';
import checkAdmin from '../Middleware/admin.middleware.js';

const adminRouter = Router();

// Define the /assign-admin route (Admin Only)
adminRouter.route('/assign-admin').post(checkAdmin, assignAdminRole);

export default adminRouter;
