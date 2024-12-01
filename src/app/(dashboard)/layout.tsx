import Menu from "@/components/Menu";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* {LEFT} */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-red-200 p-4">
        <Link href="/" className="flex items-center lg:justify-start justify-center  gap-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block">HACER'S SCHOOL</span>
        </Link>
        <Menu/>
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-blue-200">
        R
      </div>
    </div>
  );
}