import { Router } from 'express';
import  multer  from 'multer';
import uploadConfig from '../../../../../../../config/upload'

import UsersRepository from '@modules/users/infra/Typeorm/repositories/UsersRepository';
import CreateUserService from '../../../../../services/CreateUserService';
import UpdateUserAvatarService from '../../../../../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const upload = multer(uploadConfig);



usersRouter.post ('/', async (request, response) =>{
    try{

        const { name, email, password } = request.body;


        const usersRepository = new UsersRepository();
        const createUser = new CreateUserService(usersRepository);

        const user = await createUser.execute({
            name,
            email,
            password,
        });


        return response.json(user);
    } catch(err){
        return response.status(400).json({ error: err.message});
    }

});

usersRouter.patch(
'/avatar',
ensureAuthenticated,
upload.single('avatar'),
async (request, response) =>{

        const usersRepository = new UsersRepository();
        const updateUserAvatar = new UpdateUserAvatarService(usersRepository);


        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        return response.json(user)

})
export default usersRouter