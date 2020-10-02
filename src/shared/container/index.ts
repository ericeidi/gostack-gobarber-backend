import { container } from 'tsyringe';


import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/services/infra/Typeorm/repositories/AppointmentsRepository'


import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/Typeorm/repositories/UsersRepository'

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);


container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
