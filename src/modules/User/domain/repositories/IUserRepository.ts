import { ICreateUser } from "../models/ICreateUser";
import { IUser } from "../models/IUser";

export interface IUserRepository {
    create(data: ICreateUser): Promise<IUser>;
    save(user: IUser): Promise<IUser>;
    remove(user: IUser): Promise<void>;
    find(): Promise<IUser[]>;
    findByEmail(email: string): Promise<IUser>;
    findById(id: string): Promise<IUser>;
}