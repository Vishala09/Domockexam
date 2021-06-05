import React from 'react'

function Home() {
    return (
            <div className="col-lg-3 text-center d-flex justify-content-center mb-3 mb-sm-0"
                  style={{minHeight:window.screen.width<=770?'50vh':'85vh',backgroundColor:'#0D6EFD'}}>
                    <div class="" >
                        <div class="card-body d-flex flex-column justify-content-center align-items-center" >
                            <h3>Company Name</h3>
                            
                            <div className="d-flex justify-content-center align-items-center" 
                                 style={{height:'20vh',width:'100%',backgroundColor:'green'}}>
                                    Logo
                            </div>
                        </div>
                    </div>
            </div>
    )
}

export default Home
