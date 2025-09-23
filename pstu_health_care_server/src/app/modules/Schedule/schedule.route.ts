import express from "express"
import { UserRole } from "../../../../generated/prisma"
import auth from "../../middleWares/auth"
import { scheduleController } from "./schedule.controller"

const router = express.Router()

router.post("/", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), scheduleController.createScheduleInDB)

export const scheduleRouter = router