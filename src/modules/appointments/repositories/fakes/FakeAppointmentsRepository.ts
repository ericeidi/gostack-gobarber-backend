import { uuid } from 'uuidv4';
import { isEqual} from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';


import Appointment from '../../services/infra/Typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository{

    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointments = this.appointments.find(
            appointment => isEqual(appointment.date, date),
            );

        return findAppointments;

    }

    public async create(
        {date, provider_id}: ICreateAppointmentsDTO): Promise<Appointment> {

        const appointment = new Appointment();

        Object.assign(appointment, {id: uuid(), date, provider_id})

        this.appointments.push(appointment)

        return appointment;
    }


}

export default AppointmentsRepository;
