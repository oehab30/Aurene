import React from 'react'
import  HeroSection from '../components/home/Hero'
import Hotoffers from '../components/home/Hotoffers'
import DontMiss from '../components/home/Dontmiss'
import Featuredcollection from '../components/home/Featuredcollection'
import BestSellers from '../components/home/BestSellers'
import Summercollection from '../components/home/Summercollection'



function Home() {
  return (
<>
<HeroSection/>
<Hotoffers/>
<DontMiss/>
<Featuredcollection/>
<BestSellers/>
<Summercollection/>
 </>
     )
}
export default Home