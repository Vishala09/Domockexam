import React from 'react';
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
import Carousel from 'react-bootstrap/Carousel'

function ImageSlider() {
    //,home6,home7,home8,home9,home10,home11
    const images = [home1,home2,home3,home4,home5];
    
  return <div >
        <Carousel variant="dark">
            {
                images.map((el,ind)=>
                    <Carousel.Item  interval={5000}>
                        <img 
                        className="d-block w-100"
                        src={el}
                        height="800px"
                        alt="DO MOCK EXAM slide"
                        />
                        {/* <Carousel.Caption>
                        <h3>Slide {ind+1}</h3>
                        <p>Slide {ind+1} description</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                )
            }
            
  
        </Carousel>

  </div>;
}

export default ImageSlider;



            {/* <div  style={{background:'dodgerblue',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}}>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                        <button onClick={()=>goLeft()} className="btn btn-secondary" style={{position:'absolute',top:'50%',left:20,zIndex:1}}><i class="fa fa-chevron-left"></i></button>
                        <button onClick={()=>goRight()} className="btn btn-secondary" style={{position:'absolute',top:'50%',right:20,zIndex:1}}><i class="fa fa-chevron-right"></i></button>
                        <img height="600px" width="" src={images[imageIndex]} />  
                    </div>
            </div> */}
