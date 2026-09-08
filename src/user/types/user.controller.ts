import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware";
import { validation } from "../../middlewares/validation.middleware";
const router = Router()

export const routes ={
    base:"/users" ,
   list: "/friend-requests",
   cancel:"/cancelFriendRequest"
}

router.get(
    routes.list,
    auth,
    async (req, res) => {
        const userId = req.user._id
        const { isTo = true } = req.query
        const { data } = await userServices.listFriendRequest({ userId, isTo: JSON.parse(isTo as string) })
        return ({
            res,
            data
        })
    }
)

router.patch(
    routes.cancelFriendRequest
    Validation(uservalidation.cancelFriendRequest)
)




export default router