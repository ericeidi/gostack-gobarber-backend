import User from '../infra/Typeorm/entities/User'
import IcreateUserDTO from '../dtos/ICreateUserDTO'

export default interface IUserRepository {
    findById(id: string): Promise<User | undefined>;
    findByEmail(email:string): Promise<User | undefined>;
    create(data: IcreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}
