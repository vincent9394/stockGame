import HomePageInfoSection1 from './HomePageInfoSection1'
import HomePageInfoSection2 from './HomePageInfoSection2'
import NavBar from './NavBar'
export function Homepage(){
     return(
        <div>
           <NavBar/>
           <HomePageInfoSection1/>
           <HomePageInfoSection2/>
        </div>
    )
}