import { User } from '@/models/userModel'
import { queryByRoleWritter } from '@/utils/roleAprpovalQuery'
import { Request, Response, Router } from 'express'

const router = Router()

router.get('/:email', async (req: any, res: Response) => {
    const role = req.tokenUser.role
    if((role !== "super_admin") && (role != "col_dean")) {
        res.status(403).json({msg: ['You do not have autherization for this route.']})
        return
    }

    const user = await User.findOne({email: req.params.email})
        console.log(role, user?.department)

    const query = queryByRoleWritter(role, user!.department)
    User.find(query, '_id firstName lastName email department role').then(result => {
        if(!result) {
            res.status(404).json({msg: ['No user']})
        } else {
            res.status(200).json(result)
        }
    }).catch(err => {
        res.status(500).json({msg: [err.message]})
    })
})

router.put('/:id', (req: Request, res: Response) => {
    const id = req.params.id

    User.findOneAndUpdate({_id: id}, { $set: {allowed: true}}).then(result => {
        if(!result) {
            res.status(404).json({msg: ['No user']})
        } else {
            res.status(204).send({success: true})
        }
    }).catch(err => {
        res.status(500).json({msg: [err.message]})
    })
})

router.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id

    User.findOneAndDelete({_id: id}).then(result => {
        if(!result) {
            res.status(404).json({msg: ['No user']})
        } else {
            res.status(204).json({msg: 'A User deleted successfully.'})
        }
    }).catch(err => {
        res.status(500).json({msg: [err.message]})
    })
})

export { router as pendingUserRouter }