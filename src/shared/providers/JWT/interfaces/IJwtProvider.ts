import { JwtPayload } from "jsonwebtoken";
import { ICreateToken } from "./ICreateToken";

export interface IJwtProvider {
    generateToken(payload: ICreateToken): string;
    verifyToken(token: string): string | JwtPayload;
}