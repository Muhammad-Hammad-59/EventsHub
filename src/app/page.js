import BrowseByCategory from "@/components/home/browseCategory";
 
import HeroPage from "@/components/home/home";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import WhyChooseEventHub from "@/components/home/WhyChooseEventHub";

  
export default function Home() {
  return (
    <main className=''>
      <HeroPage/>
       <BrowseByCategory/>
       <UpcomingEvents/>
       <WhyChooseEventHub/>
    </main>
  )
}