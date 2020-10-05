import UserToken from '../../../users/infra/Typeorm/entities/UserToken';
import IUserTokensRepository from '../../../users/repositories/IUserTokensRepository'

import {uuid} from 'uuidv4';


import User from '../../infra/Typeorm/entities/User';

class FakeUsersTokenRepository implements IUserTokensRepository{

    private userTokens: UserToken[] = [];

    private users: User[] = [];

    public async generate(user_id:string): Promise<UserToken> {

        const userToken = new UserToken();

        Object.assign(userToken, {
            id: uuid(),
            token: uuid(),
            user_id,
            created_at: new Date(),
            updated_at: new Date(),
        });

        this.userTokens.push(userToken);

        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = this.userTokens.find(findToken => findToken.token === token);

        return userToken
    }

}

export default FakeUsersTokenRepository;
