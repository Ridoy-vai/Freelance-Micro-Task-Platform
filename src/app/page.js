import HeroBanner from "@/Components/HeroBaner";
import HowItWorks from "@/Components/HowItWorks";
import FeaturedTasks from "@/Components/LatestFutureTask";
import PlatformStats from "@/Components/PlartformStats";
import TopFreelancers from "@/Components/TopFrilancers";
import Image from "next/image";

export default function Home() {
  return (
   <>
   <HeroBanner/>
   <FeaturedTasks/>
   <TopFreelancers/>
   <HowItWorks/>
   <PlatformStats/>
   </>
  );
}
