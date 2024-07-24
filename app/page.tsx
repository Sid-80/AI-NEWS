import { AnimatedHomeScroll } from "@/components/shared/AnimatedHomeScroll";
import HomeNavbar from "@/components/shared/HomeNavbar";

export default function Home() {
  return (
    <main className="flex bg-[#EEF1FF] dark:bg-[#040D12] w-screen flex-col overflow-x-hidden">
      <HomeNavbar />
      <AnimatedHomeScroll />
    </main>
  );
}
