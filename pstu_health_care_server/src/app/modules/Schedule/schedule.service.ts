import { addHours, addMinutes, format, setMinutes } from "date-fns";

const createScheduleInDB = async (payload: any) => {
    const { startDate, endDate, startTime, endTime } = payload
    const currentDate = new Date(startDate)
    const lastDate = new Date(endDate)

    while (currentDate <= lastDate) {
        const startDateTime = new Date(
            addMinutes(
                addHours(startDate, Number(startTime.split(":")[0])),
                Number(startTime.split(":")[1])
            )
        )

        const endDateTime = new Date(
            setMinutes(
                addHours(currentDate, Number(endTime.split(":")[0])),
                Number(endTime.split(":")[1])
            )
        )
        while (startDateTime < endDateTime) {
            const intervalTime = {
                startDateTime: startDateTime,
                endDateTime: addMinutes(startDateTime, 30)
            }
            startDateTime.setMinutes(startDateTime.getMinutes() + 30)
        }
        currentDate.setDate(currentDate.getDay() + 1)
    }
}

export const scheduleServices = {
    createScheduleInDB
}