import express, { Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/Users/user.route";

const app = express();

app.use(cors());
app.use(express.json())

app.use("api/v1/user", userRoutes);

app.get("/", (req: Request, res: Response)=>{
    res.send({"message": "Server is running!"})
})

export default app;