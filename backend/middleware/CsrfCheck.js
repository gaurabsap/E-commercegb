import UserModel from "../model/userSchema/UserSchema.js";



export const CheckCsrf = async(resq, resp, next) => {
    const token = resq.header('CSRF-TOKEN')
    if(!token){
        return resp.status(404).json({
            sucess: false,
            message: "Csrf token is missing bruh!!"
        })
    }
    const checkToken = await UserModel.findOne({csrf: token})
    if(!checkToken){
        return resp.status(404).json({
            sucess: false,
            message: "Invalid token or wrong token"
        })
    }else{
        next()
    }
}