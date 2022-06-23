import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import { IBcryptProvider } from "../../../shared/providers/BcryptJS/interfaces/IBcryptProvider";
import { ICreateUser } from "../domain/models/ICreateUser";
import { IUser } from "../domain/models/IUser";
import { IUserRepository } from "../domain/repositories/IUserRepository";

@injectable()
export default class CreateUserService {
    constructor(
        @inject('userRepository')
        private userRepository: IUserRepository,
        @inject('bcryptProvider')
        private bcryptProvider: IBcryptProvider,
    ) {}

    public async execute({ email, name, password }: ICreateUser): Promise<IUser> {
        const emailExists = await this.userRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('This email already exists');
        }

        const user = await this.userRepository.create({ 
            email, 
            name, 
            password 
        });

        user.password = await this.bcryptProvider.generateHash(password);

        await this.userRepository.save(user);

        return user;
    }
}