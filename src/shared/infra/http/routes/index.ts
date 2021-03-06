import {Router} from 'express';
import appointmentsRouter from '../../../../modules/appointments/services/infra/Typeorm/entities/http/routes/appointments.routes';
import usersRouter from '../../../../modules/users/infra/Typeorm/entities/http/routes/users.routes';
import sessionsRouter from '../../../../modules/users/infra/Typeorm/entities/http/routes/sessions.routes';
import passwordRouter from '../../../../modules/users/infra/Typeorm/entities/http/routes/password.routes';
import profileRouter from '../../../../modules/users/infra/Typeorm/entities/http/routes/profile.routes';

const routes = Router();


routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
