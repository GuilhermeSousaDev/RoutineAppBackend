import { container } from 'tsyringe';
import { IUserRepository } from '../../modules/User/domain/repositories/IUserRepository';
import UserRepository from '../../modules/User/infra/typeorm/repositories/UserRepository';
import BcryptProvider from '../providers/BcryptJS/BcryptProvider';
import { IBcryptProvider } from '../providers/BcryptJS/interfaces/IBcryptProvider';
import { IJwtProvider } from '../providers/JWT/interfaces/IJwtProvider';
import JwtProvider from '../providers/JWT/JwtProvider';

container.registerSingleton<IUserRepository>(
    'userRepository',
    UserRepository,
);

container.registerSingleton<IJwtProvider>(
    'jwtProvider',
    JwtProvider,
);

container.registerSingleton<IBcryptProvider>(
    'bcryptProvider',
    BcryptProvider,
);