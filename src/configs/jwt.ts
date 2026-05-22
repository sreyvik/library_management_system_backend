import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "./env";

class JwtService {

    private secret: string;

    constructor() {
        this.secret = env.JWT_SECRET;
    }

    public generateToken(payload: object): string {

        const options: SignOptions = {
            expiresIn: "1d"
        };

        return jwt.sign(payload, this.secret, options);
    }

    public verifyToken(token: string) {

        return jwt.verify(token, this.secret);
    }

    public decodeToken(token: string) {

        return jwt.decode(token);
    }
}

export default new JwtService();