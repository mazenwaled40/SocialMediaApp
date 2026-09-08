import express,{Request, Response, NextFunction} from "express"
import chalk from "chalk"
import morgan from "morgan";
import { DBConnection } from "./db/mongoose.connection";
import router from "./auth/auth.controller";
const app = express()

export const bootstrap = async () =>{

app.use(express.json())
    app.use(morgan("dev"))
    await DBConnection()
    app.use("/auth" , router)
    app.get('/hello',(req,res) =>{
        
    })


    app.listen(process.env.PORT,()=>{
        console.log(chalk.bgGreen("server running on port"))
    })
    