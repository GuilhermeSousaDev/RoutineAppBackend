import { compare, hash } from "bcryptjs";
import { IBcryptProvider } from "./interfaces/IBcryptProvider";

export default class BcryptProvider implements IBcryptProvider {
    async generateHash(password: string): Promise<string> {
        const hashedPassword = await hash(password, 8);

        return hashedPassword;
    }

    async compareHash(hash: string, password: string): Promise<boolean> {
        const comparePassword = await compare(password, hash);

        return comparePassword;
    }
}