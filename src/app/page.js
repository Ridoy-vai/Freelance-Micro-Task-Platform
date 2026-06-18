import HeroBanner from "@/Components/HeroBaner";
import FeaturedTasks from "@/Components/LatestFutureTask";
import Image from "next/image";

export default function Home() {
  return (
   <>
   <HeroBanner/>
   <FeaturedTasks/>
   </>
  );
}
