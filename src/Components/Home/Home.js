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
