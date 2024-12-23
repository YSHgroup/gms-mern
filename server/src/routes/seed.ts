import { Request, Response, Router } from "express";
import { isEmpty } from '@/utils/isEmpty';
import { Role } from '@/models/seedModel';
import { roles } from '@/constant/user';

const router = Router();

router.post(
    "/",
    (req: any, res: Response) => {
  
      Role.find({}).then((seed) => {
        if (isEmpty(seed)) {
            Role.insertMany(roles)
            .then((result) => {
                if(!isEmpty(result)) {
                    res.status(200).json(result);
                } else { 
                    throw new Error("Failed to save");
                }
            }).catch((error => {
                throw Error(error.message)
            }))
        }
        throw Error('Seed roles exists already.')
      }).catch(err => {
        res.status(500).json({msg: [err.message]})
      })
    }
  );
  
  export { router as seedRouter };