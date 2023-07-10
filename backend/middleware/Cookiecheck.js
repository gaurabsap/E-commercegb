import jwt from 'jsonwebtoken'
import UserModel from '../model/userSchema/UserSchema.js'


export const CheckCookie = async(resq, resp, next) => {
    const {token} = resq.cookies
    try {
        jwt.verify(String(token), process.env.SECRET, (err, datas) => {
            if(err){
                return resp.status(404).json({
                    sucess: false,
                    message: "Invalid token"
                })
            }else{
                const checkUser = UserModel.findOne({_id: datas.id})
                .then((data) => {
                    if(!data){
                        return resp.status(404).json({
                            sucess: false,
                            message: "Error"
                        })
                    }
                    else{
                        resq.id = datas.id
                        // console.log(datas.id)
                        next()
                    }
                })
                .catch((err) => {
                    console.log(err)
                })                
            }
        })

    } catch (error) {
        console.log(error)
    }

}