import { Router } from 'express';

import ensureAuthenticated from '../../../../../../../users/infra/Typeorm/entities/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();


appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {

//     const appointments = await appointmentsRepository.find(); //= await appointmentsRepository.find();

//     return response.json(appointments);
// })

appointmentsRouter.post ('/', appointmentsController.create)

export default appointmentsRouter
