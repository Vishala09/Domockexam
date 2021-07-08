import React, { useEffect, useState } from 'react'
import ExamHall1 from '../../images/ExamHall1.jpeg';
import ExamHall2 from '../../images/ExamHall2.jpg';
import ExamHall3p from '../../images/ExamHall3.png'
import ExamHall4 from '../../images/ExamHall4.jpg'
import ExamHall5 from '../../images/ExamHall5.jpg';
import OnlineExam1 from '../../images/OnlineExam.jpg';

import OnlineExam2 from '../../images/OnlineExam2.png';
import ExamHall1p from '../../images/ExamHall1.png';
import ExamHall2p from '../../images/ExamHall2.png';
import ExamHall6 from '../../images/ExamHall6.jpg';
import ExamHall7 from '../../images/ExamHall7.jpg';

import OnlineTest1 from '../../images/OnlineTest1.jpg';
import OnlineTest2 from '../../images/OnlineTest2.jpg';
import OnlineTest3 from '../../images/OnlineTest3.png';
function Home() {
    const images = [OnlineExam2, ExamHall6,ExamHall7,ExamHall1,ExamHall2,OnlineTest1,ExamHall1p,OnlineTest2];
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
                        <img height="450px" width="80%" src={images[imageIndex]} />  
                    </div>
            </div>
            <div style={{position:'relative',marginTop:'50px'}}>
                <div style={{height:'50vh'}}>
                        <h1>About Us</h1>
                </div>
                <hr></hr>
                <div style={{height:'50vh'}}>
                        <h1>Our Speciality</h1>
                </div>
                <hr></hr>
                <div style={{height:'50vh'}}>
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
