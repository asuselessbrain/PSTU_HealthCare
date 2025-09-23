import { addHours, addMinutes, format, setMinutes } from "date-fns";
import { prisma } from "../../../shared/prisma";

const createScheduleInDB = async (payload: any) => {
    const { startDate, endDate, startTime, endTime } = payload;

    const currentDate = new Date(startDate)
    const lastDate = new Date(endDate)

    const schedule = []

    while (currentDate <= lastDate) {
        const startDateTime = new Date(
            addMinutes(
                addHours(`${format(currentDate, "yyyy-MM-dd")}`, Number(startTime.split(":")[0])),
                Number(startTime.split(":")[1])
            )
        )

        const endDateTime = new Date(
            addMinutes(
                addHours(`${format(currentDate, "yyyy-MM-dd")}`, Number(endTime.split(":")[0])),
                Number(endTime.split(":")[1])
            )
        )

        while (startDateTime < endDateTime) {
            const interval = {
                startDateTime,
                endDateTime: addMinutes(startDateTime, 30)
            }

            const isScheduleExist = await prisma.schedule.findFirst({
                where: {
                    startDateTime: interval.startDateTime,
                    endDateTime: interval.endDateTime
                }
            })

            if (!isScheduleExist) {
                const result = await prisma.schedule.create({
                    data: interval
                })
                schedule.push(result)
            }

            startDateTime.setMinutes(startDateTime.getMinutes() + 30)
        }
        currentDate.setDate(currentDate.getDate() + 1)
    }
    return schedule
}

export const scheduleServices = {
    createScheduleInDB
}