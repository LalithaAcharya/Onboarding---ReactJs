import { useEffect } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css'

const Home = () => {

        const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        };

    useEffect(()=>{
        sessionStorage.clear();
    })
    return (  
        <div className="">
            <div className="mt-0 d-flex">
                <div className=" right">
                    <div className="application-name">
                    <h1>Papperless OnBoarding</h1>
                    <h1>Application</h1>
                    <h5 className="sub">New Joiner Experience</h5>
                    </div>
                </div>
                <div className="left-container">
                <Slider {...settings}>
        <div>
          <img src="https://www.cflowapps.com/wp-content/uploads/2022/11/paprls_onbrding.jpg" alt="Slide 1" width="700px" height="450px"/>
        </div>
        <div>
          <img src="https://www.sbmarketingtools.com/wp-content/uploads/2022/11/employee-onboarding.jpg" alt="Slide 2"  width="700px" height="450px"/>
        </div>
        <div>
          <img src="https://www.ismartrecruit.com/upload/blog/What_is_Paperless_Onboarding.webp.dat" alt="Slide 3"  width="700px" height="450px"/>
        </div>
        {/* Add more slides as needed */}
      </Slider>
                </div>
            </div>
        </div>
    );
}
 
export default Home;