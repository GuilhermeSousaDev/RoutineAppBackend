import { JwtPayload, sign, verify } from "jsonwebtoken";
import { auth } from "../../../config/auth";
import { ICreateToken } from "./interfaces/ICreateToken";
import { IJwtProvider } from "./interfaces/IJwtProvider";

export default class JwtProvider implements IJwtProvider {
    public generateToken(payload: ICreateToken): string {
        const token = sign(payload, auth.secret, { expiresIn: auth.expires });

        return token;
    }

    public verifyToken(token: string): string | JwtPayload {
        const verifiedToken = verify(token, auth.secret);

        return verifiedToken;
    }
}