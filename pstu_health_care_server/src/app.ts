import express, { Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleWares/globalErrorHandlerer";
import notFound from "./app/middleWares/notFound";
import router from "./app/routes/routes";

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response)=>{
    res.send({"message": "Server is running!"})
})

app.use(globalErrorHandler)
app.use(notFound)

export default app;