import React from 'react'
import ExamHall1 from '../../images/ExamHall1.jpeg';
import ExamHall2 from '../../images/ExamHall2.jpg';
import ExamHall3 from '../../images/ExamHall3.png'
import ExamHall4 from '../../images/ExamHall4.jpg'
import ExamHall5 from '../../images/ExamHall5.jpg';
import OnlineExam from '../../images/OnlineExam.jpg'
function Home() {
    
    return (
        <div style={{top:'20vh'}} className="container-fluid">
            <h4  className="d-flex justify-content-center">Company Logo</h4>
            <div style={{height:'80vh'}}>
                    <div className="row">
                        <img className="col-4" height="250px" src={ExamHall1} />
                        <img className="col-4" height="250px" src={OnlineExam} />
                        <img className="col-4" height="250px" src={ExamHall2} />
                </div>
                <div className="row">
                        <img className="col-4" height="250px" src={ExamHall5} />
                        <img className="col-4" height="250px" src={ExamHall3} />
                        <img className="col-4" height="250px" src={ExamHall4} />
                    </div>
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
            <hr></hr>
            <div style={{height:'50vh',width:'100%',background:'gray'}}>
                    <h1>Footer</h1>
            </div>
        </div>
    )
}

export default Home
