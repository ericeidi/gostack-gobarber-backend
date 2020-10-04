//import User from '../infra/Typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe'
import IMailProvider from '../../../shared/container/providers/StorageProvider/MailProvider/models/IMailProvider'
//import AppError from '../../../shared/errors/AppError'

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
        ) {}

    public async execute({ email }:IRequest): Promise<void>{
        this.mailProvider.sendMail(email, 'Pedido de recuperacao de email recebido')
    }
}

export default SendForgotPasswordEmailService;
