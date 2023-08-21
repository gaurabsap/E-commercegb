import UserModel from "../model/userSchema/UserSchema.js";

export const isAdmin = async (resq, resp, next) => {
  const { id } = resq;
  try {
    const admin = await UserModel.findOne({ _id: id });
    // console.log(admin);
    // console.log(admin);
    if (admin.isAdmin === 1) {
      console.log("admin ho");
      next();
    } else {
      return resp.status(400).json({
        sucess: false,
        message: "Unauthorized user!!",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
