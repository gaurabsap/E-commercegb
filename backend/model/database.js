import mongoose from "mongoose";

const ConnectDb = async() => {
    try {
        const resq = await mongoose.connect(process.env.MONGO_URL)
        if(resq){
            console.log('Connect with db')
        }
    } catch (error) {
        console.log(error)
        
    }
}

export default ConnectDb

