import React, { useEffect, useState } from 'react'
import ExamHall1 from '../../images/ExamHall1.jpeg';
import ExamHall2 from '../../images/ExamHall2.jpg';
import ExamHall3 from '../../images/ExamHall3.png'
import ExamHall4 from '../../images/ExamHall4.jpg'
import ExamHall5 from '../../images/ExamHall5.jpg';
import OnlineExam from '../../images/OnlineExam.jpg'
function Home() {
    const images = [ExamHall1,ExamHall2,ExamHall4,ExamHall5,OnlineExam];
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
            <h4  className="d-flex justify-content-center">Company Logo </h4>
            <div  >
                    <div >
                            <button onClick={()=>goLeft()} className="btn btn-primary" style={{position:'absolute',top:'50%',left:20}}><i class="fa fa-chevron-left"></i></button>
                            <button onClick={()=>goRight()} className="btn btn-primary" style={{position:'absolute',top:'50%',right:20}}><i class="fa fa-chevron-right"></i></button>
                            <img height="450px" width="100%" src={images[imageIndex]} />  
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
