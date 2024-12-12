import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const secret_key = process.env.SECRET_KEY ?? 'sh'

export const authVerify = (req: any, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).json({ msg: "Authorization denied" });
    return
  }
  try {
    const decoded = jwt.verify(token, secret_key!);
    // console.log('decoded: ', decoded)
    req.tokenUser = decoded;
    next();
  } catch (err: any) {
    // console.log('middle---', err)
    if (err.name === "TokenExpiredError") {
      res.status(401).send({ msg: "token expired" });
      return
    }
    res.status(401).json({ msg: "Authorizaton denied" });
  }
};
