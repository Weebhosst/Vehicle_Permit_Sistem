import { Router } from 'express';
import PermitController from '../controllers/permitController';

const router = Router();
const permitController = new PermitController();

export function setPermitRoutes(app) {
    app.use('/api/permits', router);

    router.post('/', permitController.createPermit.bind(permitController));
    router.get('/:platNumber', permitController.getPermit.bind(permitController));
    router.get('/', permitController.getAllPermits.bind(permitController));
}