import { Router } from "express";
//import { UserServices } from "./user.services";
import { cancelFriendRequestData } from "./user.validation";
import { Huser } from "./user.types";
import { auth } from "../../middlewares/auth.middleware";
import { validation } from "../../middlewares/validation.middleware";
const router = Router();

export const routes = {
  base: "/users",
  list: "/friend-requests",
  cancelFriendRequest: "/cancelFriendRequest",
};

router.get(routes.list, auth, async (req, res) => {
  const userId = req.user._id;
  const { isTo = true } = req.query;
  const { data } = await UserServices.listFriendRequest({
    userId,
    isTo: JSON.parse(isTo as string),
  });
  return {
    res,
    data,
  };
});

router.patch(
  routes.cancelFriendRequest,
  validation(uservalidation.cancelFriendRequestData),
  auth,
  async (req, res) => {
    const { id } = req.params as uservalidation.cancelFriendRequestData;
    const userId = req.user.id;
    await UserServices.cancelFriendRequest({ id, userId });
  },
);

export default router;
