import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const ParentPage = async () => {
  const { userId } = await auth();
  const currentUserId = userId!;

  const students = await prisma.student.findMany({
    where: {
      parentId: currentUserId,
    },
  });

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="flex-1">
        {students.map((student) => (
          <div className="w-full xl:w-2/3" key={student.id}>
            <div className="bg-white p-4 rounded-md mb-4">
              <h1 className="text-xl font-semibold mb-2">
                Schedule ({student.name} {student.surname})
              </h1>
              <div className="h-[450px] overflow-hidden">
                {student.classId !== null && (
                  <BigCalendarContainer
                    type="classId"
                    id={student.classId}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
