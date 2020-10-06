//import User from '../infra/Typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository'
import { injectable, inject } from 'tsyringe'
import IMailProvider from '../../../shared/container/providers/StorageProvider/MailProvider/models/IMailProvider'
import AppError from '../../../shared/errors/AppError'

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject ('UserTokensRepository')
        private userTokenRepository: IUserTokensRepository,

        ) {}

    public async execute({ email }:IRequest): Promise<void>{
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError('User does not exists');
        }

        const {token} = await this.userTokenRepository.generate(user.id);

        this.mailProvider.sendMail(email, `Pedido de recuperacao de email recebido: ${token} ` )
    }
}

export default SendForgotPasswordEmailService;
