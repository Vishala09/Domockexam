import React from 'react'

function Home() {
    return (
            <div className="col-md-3 text-center d-flex justify-content-center mb-3 mb-sm-0"
                  style={{minHeight:window.screen.width<=576?'50vh':'85vh',backgroundColor:'#0D6EFD'}}>
                    <div class="" >
                        <div class="card-body" >
                            <h3>Company Name</h3>
                            
                            <div className="d-flex justify-content-center align-items-center" 
                                 style={{height:'200px',width:'200px',backgroundColor:'green'}}>
                                    Logo
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default Home
