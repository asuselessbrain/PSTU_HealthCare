import express, { Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/Users/user.route";
import { adminRoutes } from "./app/modules/Admin/admin.route";
import globalErrorHandler from "./app/middleWares/globalErrorHandlerer";
import notFound from "./app/middleWares/notFound";

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/", (req: Request, res: Response)=>{
    res.send({"message": "Server is running!"})
})

app.use(globalErrorHandler)
app.use(notFound)

export default app;