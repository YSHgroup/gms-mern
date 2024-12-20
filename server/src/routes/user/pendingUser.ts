import { User } from '@/models/userModel'
import { isEmpty } from '@/utils/isEmpty'
import { queryByRoleWritter } from '@/utils/roleAprpovalQuery'
import { Request, Response, Router } from 'express'

const router = Router()

router.get('/:email', async (req: any, res: Response) => {
    const role = req.tokenUser.role
    if((role !== "grant_dir") && (role != "col_dean")) {
        res.status(403).json({msg: ['You do not have autherization for this route.']})
        return
    }

    const user = await User.findOne({email: req.params.email})
        console.log(role, user?.department)

    const query = queryByRoleWritter(role, user!.department?? '')
    User.find(query, '_id firstName lastName email department enrolment role allowed rejected').then(result => {
        if(isEmpty(result)) {
            res.status(404).json({msg: ['No user']})
        } else {
            console.log('result: ', result)
            res.status(200).json(result)
        }
    }).catch(err => {
        res.status(500).json({msg: [err.message]})
    })
})

router.put('/user/:id', (req: any, res: Response) => {
    const id = req.params.id
    User.findById(req.params.id).then((user) => {
        if(isEmpty(user)) {
            res.status(404).json({msg: ['No user']})
        } else {
            const query: Record<string, boolean> = {allowed: true}
            if(req.tokenUser.role === 'grant_dir' && user?.rejected) {
                query.rejected = false
            }
            User.findOneAndUpdate({_id: id}, { $set: query}).then(result => {
                if(isEmpty(result)) {
                    res.status(404).json({msg: ['No user']})
                } else {
                    res.status(204).send({success: true})
                }
            }).catch(err => {
                res.status(500).json({msg: [err.message]})
            })
        }
    }).catch(error => {
        res.status(500).json({msg: [error.message]})
    })
})

router.patch('/user/:id', (req: any, res: Response) => {
    const id = req.params.id

    User.findById(req.params.id).then((user) => {
        if(isEmpty(user)) {
            res.status(404).json({msg: ['No user']})
        } else {
            const query: Record<string, boolean> = {rejected: true}
            if(req.tokenUser.role === 'grant_dir' && user?.allowed) {
                query.allowed = false
            }
            User.findOneAndUpdate({_id: id}, {$set: query}).then(result => {
                if(!result) {
                    res.status(404).json({msg: ['No user']})
                } else {
                    res.status(200).json({msg: 'A User rejected successfully.'})
                }
            }).catch(err => {
                res.status(500).json({msg: [err.message]})
            })
        }
    }).catch(error => {
        res.status(500).json({msg: [error.message]})
    })    
})

router.put('/multi-user', (req: Request, res: Response) => {
    const idList = req.body

    User.updateMany({_id: { $in: idList}}, { $set: {allowed: true}}).then(result => {
        if(!result) {
            res.status(404).json({msg: ['No user']})
        } else {
            res.status(204).send({success: true})
        }
    }).catch(err => {
        res.status(500).json({msg: [err.message]})
    })
})

router.patch('/multi-user', (req: Request, res: Response) => {
    const idList = req.body

    User.updateMany({_id: { $in: idList}}, {$set: {
        rejected: true
    }}).then(result => {
        if(!result) {
            res.status(404).json({msg: ['No user']})
        } else {
            res.status(200).json({msg: 'A User rejected successfully.'})
        }
    }).catch(err => {
        res.status(500).json({msg: [err.message]})
    })
})

export { router as pendingUserRouter }