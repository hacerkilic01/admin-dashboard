import Image from "next/image";
import AttendanceChart from "./AttendanceChart";

const AttendanceChartContainer = async () => {
  // Gün adları
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  // Hazır mock veri — her gün için present ve absent değerleri
  const attendanceMap: { [key: string]: { present: number; absent: number } } = {
    Mon: { present: 4, absent: 1 },
    Tue: { present: 3, absent: 2 },
    Wed: { present: 4, absent: 1 },
    Thu: { present: 5, absent: 0 },
    Fri: { present: 4, absent: 1 },
  };

  // Grafik için uygun formata dönüştür
  const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));

  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <AttendanceChart data={data} />
    </div>
  );
};

export default AttendanceChartContainer;
