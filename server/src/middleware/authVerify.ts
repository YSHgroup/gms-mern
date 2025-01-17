import { confirmUserByEmail } from '@/utils/confirmUserByEmail';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const secret_key = process.env.SECRET_KEY ?? 'sh'

export const authVerify = async (req: any, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).json({ msg: "Authorization denied" });
    return
  }
  try {
    const decoded = jwt.verify(token, secret_key!);
    const confirmation = await confirmUserByEmail((typeof decoded !== 'string' && 'email' in decoded )? decoded.email: null)
    if(!confirmation.confirmed) {
      res.status(401).json({msg: "Authorization denied"});
      return
    }
    req.tokenUser = decoded;
    next();
  } catch (err: any) {
    // console.log('middle---', err)
    if (err.name === "TokenExpiredError") {
      res.status(401).send({ msg: "token expired" });
      return
    }
    res.status(500).json({ msg: "Error in validating authorization" });
  }
};
