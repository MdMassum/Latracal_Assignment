import mongoose from "mongoose";

const ConnectToMongo = () =>{
    
    mongoose.connect(process.env.MONGODB_URL)
    .then((data)=>console.log(`Mongodb Connected Successfully`))
    .catch((err)=>console.log(err))

}

export default ConnectToMongo;