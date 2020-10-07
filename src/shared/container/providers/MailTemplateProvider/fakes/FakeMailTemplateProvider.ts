import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
    public async parse({
        template,
     }: IParseMailTemplateDTO ): Promise<string> {
         return template;
     }

}

export default FakeMailTemplateProvider;
