//import User from '../infra/Typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

import { injectable, inject } from 'tsyringe'
import { isAfter, addHours } from 'date-fns'

import AppError from '../../../shared/errors/AppError'
import { Repository } from 'typeorm';

interface IRequest {
    token: string
    password: string;
}

@injectable()
class ResetPasswordService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,


        @inject ('UserTokensRepository')
        private userTokenRepository: IUserTokensRepository,


        @inject ('HashProvider')
        private HashProvider: IHashProvider,
        ) {}

    public async execute({ token, password }:IRequest): Promise<void>{
        const userToken = await this.userTokenRepository.findByToken(token);

        if (!userToken){
            throw new AppError('User token does not exist');
        }
        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user){
            throw new AppError('User does not exists');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)){
            throw new AppError('token expired');
        }

        user.password = await this.HashProvider.generateHash(password);

        await this.usersRepository.save(user);
    }
}

export default ResetPasswordService;
