import React from 'react'

function Home() {
    
    return (
        <div style={{top:'20vh',margin:'20px'}} >
            <h4  className="d-flex justify-content-center">Home</h4>
            <div style={{height:'80vh',background:'gold',display:'flex',justifyContent:'center', alignItems:'center'}}>
                    <h1>Some info or image goes here...</h1>
            </div>
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
        </div>
    )
}

export default Home
