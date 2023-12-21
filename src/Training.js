import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./Training.css";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import angular from './assets/angular.webp'

const Training = () => {
    const { id } = useParams();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/employeeList?id="+id).then((res) => {
            return res.json();
        }).then((resp) => {
            // console.log(resp);
            setData(resp[0]);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [data])

  return (
    <div>
        <div className="container training-container">
        <div className='container head-name'>
                <h3>Training Details</h3>
            </div>
            <div className="mt-0 d-flex">
                <div className="rights">
                  
                    <div className="application-name">
                    {data.course=='angular' &&
                    <h1>Angular</h1>
                        }
                    <h1>Developer Training</h1>
                    <h5 className="sub">Duration : {data.trainingPeriod}</h5>
                    </div>
                </div>
                <div className="lefts-container">
                <Slider {...settings}>
        <div>
          <img src="https://media.licdn.com/dms/image/D5612AQF-2JxyWTGN1A/article-cover_image-shrink_720_1280/0/1686818483238?e=2147483647&v=beta&t=wMtLwGbftMZXAZaOKjZAAAn2dr1eGhUcRX_Hg5qxEUc" alt="Slide 1" width="600px" height="450px"/>
        </div>
        <div>
          <img src="https://images.tristatetechnology.com/blog-images/uploads/2017/09/Why-AngularJS-A1.jpg" alt="Slide 2"  width="600px" height="450px"/>
        </div>
        <div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEiqVc7nIqieDJgYLZ4gBUk7pTXKeb6dE4uJvlPkepg9uSDsPuENvlwVJAxO89DAKkEpg&usqp=CAU" alt="Slide 3"  width="600px" height="450px"/>
        </div>
        {/* Add more slides as needed */}
      </Slider>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Training