import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '../../../../../services/UpdateProfileService';
import ShowProfileService from '../../../../../services/ShowProfileService';

export default class UsersController{

    public async show(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const showProfile = container.resolve(ShowProfileService);

        const user = await showProfile.execute({user_id});

        delete user.password;

        return response.json(user);

    }
    public async update(request: Request, response: Response): Promise<Response> {



            const user_id = request.user.id;
            const { name, email,  old_password, password} = request.body;

            const updateProfileService = container.resolve(UpdateProfileService);

            const user = await updateProfileService.execute({
                user_id,
                name,
                email,
                old_password,
                password,
            });

            delete user.password;

            return response.json(user);

    }
}