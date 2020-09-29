import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/services/infra/Typeorm/repositories/AppointmentsRepository'
import CreateAppointmentService from '../../../../../CreateAppointmentService';

import ensureAuthenticated from '../../../../../../../users/infra/Typeorm/entities/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {

//     const appointments = await appointmentsRepository.find(); //= await appointmentsRepository.find();

//     return response.json(appointments);
// })

appointmentsRouter.post ('/', async (request, response) =>{

        const { provider_id, date } = request.body;


        const parsedDate = parseISO(date);


        const appointmentsRepository = new AppointmentsRepository();

        const createAppointment = new CreateAppointmentService(appointmentsRepository);

        const appointment = await createAppointment.execute({
            date:
            parsedDate,
            provider_id
            });

        return response.json(appointment);

});

export default appointmentsRouter