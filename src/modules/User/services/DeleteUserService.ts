import { inject, injectable } from "tsyringe";
import { IUser } from "../domain/models/IUser";
import { IUserRepository } from "../domain/repositories/IUserRepository";

@injectable()
export default class DeleteUserService {
    constructor(
        @inject('userRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute(id: string): Promise<void> {
        const user = await this.userRepository.findById(id);

        await this.userRepository.remove(user);
    }
}