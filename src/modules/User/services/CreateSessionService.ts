import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import { IBcryptProvider } from "../../../shared/providers/BcryptJS/interfaces/IBcryptProvider";
import { IJwtProvider } from "../../../shared/providers/JWT/interfaces/IJwtProvider";
import { ICreateSession } from "../domain/models/ICreateSession";
import { ISession } from "../domain/models/ISession";
import { IUserRepository } from "../domain/repositories/IUserRepository";

@injectable()
export default class CreateSessionService {
    constructor(
        @inject('jwtProvider')
        private jwtProvider: IJwtProvider,
        @inject('bcryptProvider')
        private bcryptProvider: IBcryptProvider,
        @inject('userRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute({ email, password }: ICreateSession): Promise<ISession> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User not found');
        }

        const comparePassword = await this.bcryptProvider.compareHash(user.password, password);

        if (!comparePassword) {
            throw new AppError('Incorrect Password');
        }

        const token = this.jwtProvider.generateToken({ 
            id: user.id,
            name: user.name,
        });

        return {
            user,
            token,
        }
    }
}