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

function Home() {
    const images = [home1,home2,home3,home4,home5,home6,home7,home8,home9,home10,home11];
    const [imageIndex, setimageIndex] = useState(0)
    useEffect(() => {
       // loadImages();
        
    }, []);
    let loadImages = () => {
       let loadImageinterval =  setInterval(() => {
        console.log(imageIndex)
            setimageIndex((imageIndex)=>imageIndex+1)
        }, 2000);
    }
    let goLeft = () => {
          if(imageIndex==0)
          {
                setimageIndex(images.length-1);
          }
          else
          {
                  setimageIndex((imageIndex)=>imageIndex-1);
          }
    }
    let goRight = () => {
        if(imageIndex==images.length-1)
        {
              setimageIndex(0);
        }
        else
        {
                setimageIndex((imageIndex)=>imageIndex+1);
        }
  }
    return (
        <div style={{top:'20vh'}} className="container-fluid">
            <h4  className="d-flex justify-content-center ">Company Logo </h4>
            <div  style={{background:'dodgerblue',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                        <button onClick={()=>goLeft()} className="btn btn-primary" style={{position:'absolute',top:'50%',left:20,zIndex:1}}><i class="fa fa-chevron-left"></i></button>
                        <button onClick={()=>goRight()} className="btn btn-primary" style={{position:'absolute',top:'50%',right:20,zIndex:1}}><i class="fa fa-chevron-right"></i></button>
                        <img height="450px" width="" src={images[imageIndex]} />  
                    </div>
            </div>
            <div style={{position:'relative',marginTop:'50px'}}>
                <div style={{minHeight:'50vh'}}>
                        <h1>About Us</h1>
                        <div className="homediv">
                    <p>     We are a digital platform committed to helping students and teachers achieve their academic goals. </p>

<p>   The platform offers FREE as well as paid practice exams, at reasonable and affordable prices, for students to try out under real exam like time duration to better prepare them for the real exam. The platform analyses each student’s performance on every exam attempted and provides a detail report highlighting for students and teachers area/s for improvements before attempting further exams. The iterative process helps the student build confidence and face the real exam reassured.</p>

<p>   We offer practice exams created by a panel of highly qualified and experienced and well-trained examiners who have been preparing and marking exam for various exams for years. There will be regular and continuous new practice exams added to the pool of practice exams.</p>

<p>  The platform also offers the feature for teachers to create customized practice exams for FREE. It helps teachers easily and quickly create paper less practice exams and share with their students instantly with a click. The platform takes care of marking these papers, sparing the teachers the effort and enables them to focus their precious time more on teaching.</p>

<p>   Our vision is to be a leader in making every student successful in their academic goals</p>

<p>   Our mission is to provide as many quality practice exams as possible for students to attempt and be best at their real examination and for every teacher making and marking of the online exams, they create quick and easy.</p>
                        </div>
                </div>
                <hr></hr>
                <div style={{minHeight:'50vh'}}>
                        <h1>Our Speciality</h1>
                </div>
                <hr></hr>
                <div style={{minHeight:'50vh'}}>
                        <h1>Contact Us</h1>
                </div>
                <hr></hr>
                <div style={{height:'50vh',width:'100%',background:'gray'}}>
                        <h1>Footer</h1>
                </div>
            </div>
        </div>
    )
}

export default Home
