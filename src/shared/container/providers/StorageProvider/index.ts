import {container} from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMainProvider';

import IMailTemplateProvider from '../MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '../MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider> (
    'StorageProvider',
    DiskStorageProvider,
)



container.registerSingleton<IMailTemplateProvider> (
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider,
)

container.registerInstance<IMailProvider> (
    'MailProvider',
    container.resolve(EtherealMailProvider),
)
