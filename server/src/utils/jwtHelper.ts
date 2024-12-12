import { sign, verify } from "jsonwebtoken";

const secret_key = process.env.SECRET_KEY ?? 'sh'

export const generateToken = (user: any) => {
    return sign({ id: user._id, email: user.email }, secret_key, {
        expiresIn: '1h'
    });
};

export const verifyToken = (token: any) => {
    return verify(token, secret_key);
};