import Appointment from './infra/Typeorm/entities/Appointment';
import AppointmentsRepository from './infra/Typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError'

import {startOfHour} from 'date-fns';
import User from '../../users/infra/Typeorm/entities/User';

interface IRequest {
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService{

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
     ) {}

    public async execute({date, provider_id}: IRequest): Promise<Appointment> {

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
        appointmentDate,
        );


    if (findAppointmentInSameDate) {
        throw new AppError('This appointment is already booked');
    }

   const appointment = await this.appointmentsRepository.create(
       {
           provider_id,
           date: appointmentDate,
       }
   );


       return appointment;
    }
}

export default CreateAppointmentService;
