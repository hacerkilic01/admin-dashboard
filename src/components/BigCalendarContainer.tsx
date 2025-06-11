import prisma from "@/lib/prisma";
import BigCalendar from "./BigCalendar";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";
import { toZonedTime } from "date-fns-tz";

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) => {
  const dataRes = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
  });

  const timezone = "Europe/Istanbul";

  const data = dataRes
    .filter((lesson) => lesson.startTime && lesson.endTime)
    .map((lesson) => ({
      title: lesson.name,
      start: toZonedTime(new Date(lesson.startTime), timezone),
      end: toZonedTime(new Date(lesson.endTime), timezone),
    }));

  const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <div className="">
      <BigCalendar data={schedule} />
    </div>
  );
};

export default BigCalendarContainer;
