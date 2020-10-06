import { container } from 'tsyringe';


import '../../modules/users/providers';
import './providers/StorageProvider';

import IAppointmentsRepository from '../../modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '../../modules/appointments/services/infra/Typeorm/repositories/AppointmentsRepository'


import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/Typeorm/repositories/UsersRepository'


 import IUserTokensRepository from '../../modules/users/repositories/IUserTokensRepository';
 import UserTokensRepository from '../../modules/users/infra/Typeorm/repositories/UserTokensRepository'

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);


container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);


container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository);
