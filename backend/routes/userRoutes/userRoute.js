import express from "express";
import {
  UserRegister,
  UserLogin,
  UserProfile,
  UserLogout,
} from "../../controller/userController/userController.js";

import { CheckCookie } from "../../middleware/Cookiecheck.js";

const routes = express.Router();

routes.post("/user/register", UserRegister);
routes.post("/user/login", UserLogin);
routes.get("/user/profile", CheckCookie, UserProfile);
routes.get("/user/logout", CheckCookie, UserLogout);

export default routes;
