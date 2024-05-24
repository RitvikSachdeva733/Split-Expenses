
import React, {useEffect} from 'react';
import './Landing.css';
import Bill from '../Assets/Bill.png';
import Pic1 from '../Assets/Pic1.webp';
import Pic2 from '../Assets/Pic2.webp';
import Pic3 from '../Assets/Pic3.webp';
import Pic4 from '../Assets/Pic4.webp';
import Pic5 from '../Assets/Pic5.webp';
import Pic6 from '../Assets/Pic6.webp';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const Landing = () => {
    useEffect(()=>{
        AOS.init({duration: 2000})
    },[]);

  return (
    <div className='wrap'>
        <div className='Heading' data-aos="flip-left">
            <h1>Welcome to SBS</h1>
        </div>
        <div className="topsection" data-aos="zoom-in">
            <div className="text-container">
                <h1>Integrated Bill Splitting System</h1>
            </div>
            <div className="image-container">
                <img src={Bill} alt="500 Rupees Bill"/>
            </div>
        </div>

        <div className="SBS" data-aos="fade-right">
            <h1>What is SBS?</h1>
            <h3>It's a go-to for hassle-free bill splitter! A smart solution that keeps your bills. Suitable for all types of bills, including group bill management(multi-users), individual bills, family expenses, etc.</h3>
        </div> 
        <div className="Features">
        <h1>Top Features of Our Bill Splitting System</h1>
            <div className="center">
                <div className="flex_card">

                    <div className="card_course" data-aos="fade-up">
                        <img src={Pic1} alt=""/>
                        <h5>Secure Expense Management</h5>
                        <p>Manage your expenses in the most efficientand secure way.</p>
                    </div>
                    <div className="card_course" data-aos="fade-down">
                        <img src={Pic2} alt=""/>
                        <h5>Group Creation and Management</h5>
                        <p>Make groups for events that require contributions in the expenses.</p>
                    </div>
                    <div className="card_course" data-aos="fade-up">
                        <img src={Pic3} alt=""/>
                        <h5>Payment Tracking</h5>
                        <p>Track your payments and check who you owe and who owes you</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="Why">
            <h1>Why Semantix Bill Splitting System?</h1>
            <div className="center">
                <div className="flex_card">
                    <div className="card_course" data-aos="fade-down">
                        <img src={Pic4} alt=""/>
                        <h5>Easy to Use</h5>
                        <p>Manage your expenses and bills using your handheld device.</p>
                    </div>
                    <div className="card_course" data-aos="fade-up">
                        <img src={Pic5} alt=""/>
                        <h5>Foolproof</h5>
                        <p>It is based on cloud and mobile technology, and therefore reduces manual errors.</p>
                    </div>
                    <div className="card_course" data-aos="fade-down">
                        <img src={Pic6} alt=""/>
                        <h5>Customizable</h5>
                        <p>Features can be quickly and easily added or tailored to specific needs.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Landing;