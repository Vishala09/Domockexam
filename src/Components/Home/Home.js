import React, { useEffect, useState } from 'react'

import home1 from '../../images/home1.jpg';
import home2 from '../../images/home2.jpeg';
import home3 from '../../images/home3.jpg'
import home4 from '../../images/home4.png'
import home5 from '../../images/home5.png';
import home6 from '../../images/home6.png';

import home7 from '../../images/home7.png';
import home8 from '../../images/home8.jpg'
import home9 from '../../images/home9.jpg'
import home10 from '../../images/home10.jpg';
import home11 from '../../images/home11.jpg';

import './Home.css'
import Footer from './Footer';
import ImageSlider from './ImageSlider';
import ContactUs from './ContactUs'
import CompanyName from './CompanyName';

function Home() {
   
    return (
        <div className='homepage' style={{}}>
        <div style={{padding:window.screen.width>770?'0px 100px 100px 100px':''}} className="container-fluid homeFont">
            <div style={{marginTop:'100px'}}>
                <h4 className="d-flex flex-column align-items-center justify-content-center "> <CompanyName/> </h4>
            </div>
        
            <div style={{marginTop:'30px'}}>
                <ImageSlider></ImageSlider>
            </div>
            

            <div style={{position:'relative',marginTop:'50px'}}>
                <div id="aboutusdiv" style={{minHeight:'100vh'}}>
                        <h3 className="d-flex flex-column align-items-center justify-content-center leftslide"
                         style={{position:'relative',marginBottom:'20px'}} >About Us</h3>
                        <div className="aboutus">
                    <p>     We are a digital platform committed to helping students and teachers achieve their <b>academic goals</b>. </p>

<p>   The platform offers <i>FREE</i> as well as paid practice exams, at reasonable and <i>affordable prices</i>, for students to try out under real exam like time duration to better prepare them for the real exam. The platform analyses each student’s performance on every exam attempted and provides a <b><i>detailed report</i></b> highlighting for students and teachers area/s for improvements before attempting further exams. The iterative process helps the student build confidence and face the real exam reassured.</p>

<p>   We offer <span class="awesome">PRACTICE EXAMS</span>  created by a panel of highly qualified and experienced and well-trained examiners who have been preparing and marking exam for various exams for years. There will be regular and continuous new practice exams added to the pool of practice exams.</p>

<p>  The platform also offers the feature for teachers to create <b><i>customized practice exams for FREE</i></b>. It helps teachers easily and quickly create paper less practice exams and share with their students instantly with a click. The platform takes care of marking these papers, sparing the teachers the effort and enables them to focus their precious time more on teaching.</p>

<p>   Our vision is to be a leader in making every student successful in their academic goals</p>

<p>   Our mission is to provide as many quality practice exams as possible for students to attempt and be best at their real examination and for every teacher making and marking of the online exams, they create quick and easy.</p>
                        </div>
                </div>
                <hr></hr>

                <div style={{position:'relative'}}>
                    
                    <h3 style={{marginBottom:'20px',position:'relative'}} id="services" className='d-flex flex-column align-items-center justify-content-center leftslide'>Our Services</h3>
                
                <div style={{padding:'10px'}}>
                        <div style={{minHeight:'25vh'}}>
                                <div className='row'>
                                    <div className='col-8'>
                                          <h3 className='serviceHeader'>Students</h3>
                                          <p>Students of any age can have a free account; take practice exams and have reports analysing their performance

</p>
                                    </div>
                                    <div className='col-4'>
                                        <img src={home1} height='100px' />
                                    </div>
                                </div>
                        </div>
                        
                        <div style={{minHeight:'25vh'}}>
                                <div className='row'>
                                    <div className='col-4'>
                                        <img src={home4} height='100px' />
                                    </div>
                                    <div className='col-8'>
                                          <h3 className='serviceHeader'>Parents</h3>
                                          <p>Parents can have free account for them and  assign exams to their children and have reports analysing their children’s performance</p>
                                    </div>
                                </div>
                        </div>
                    
                        <div style={{minHeight:'25vh'}}>
                                <div className='row'>
                                    <div className='col-8'>
                                          <h3 className='serviceHeader'>Tutor</h3>
                                          <p>Tutors can have a paid account and create exams with multiple exam techniques by having variety of question types such as MCQ, True or False, Rearrange, Gap Filling etc.</p>
                                    </div>
                                    <div className='col-4'>
                                        <img src={home9} height='100px' />
                                    </div>
                                </div>
                        </div>
                        
                        <div style={{minHeight:'25vh'}}>
                                <div className='row'>
                                    <div className='col-4'>
                                        <img src={home8} height='100px' />
                                    </div>
                                    <div className='col-8'>
                                          <h3 className='serviceHeader'>Teachers</h3>
                                          <p>Teachers can have a free account for them and their students assign exams to any number of students and have reports analysing their student’s performance</p>
                                    </div>
                                </div>
                        </div>
                </div>
                </div>
                <hr></hr>


                {/* <div style={{minHeight:'50vh'}}>
                        <h1>Our Speciality</h1>
                </div>
                <hr></hr> */}
                <ContactUs></ContactUs>
                <hr></hr>
                
            </div>
            </div>
            <div >
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Home

