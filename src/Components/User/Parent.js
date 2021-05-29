import React, { useRef } from 'react'
import PasswordView from '../HelperComps/PasswordView';
function Parent() {
    const Passref = useRef()
    return (
        <div className="col-md-6">
        <div  style={{marginTop:window.screen.width<=576?'15px':'0px', backgroundColor:'#F5F5F5',border:'1px solid #ced4da',overflow:'hidden'}}>
            <div className="mb-2" style={{backgroundColor:'#0D6EFD',color:'white',paddingLeft:'10px'}}>
                   Parent Registration Form(Must be completed)
            </div>
            <form>
           
            <div class="row smalltext" > 
                <h6 class="px-3 smalltext">Parent First Name : <span className="px-1" style={{color:'red'}}>*</span></h6>
                <div class="px-3 paddedInput"  >
                    <input class="mb-2 form-control smalltext" type="text" name="firstname" placeholder="Enter First Name" /> 
                </div>
            </div>
            <div class="row smalltext" > 
                <h6 class="px-3 smalltext">Parent Surname : <span className="px-1" style={{color:'red'}}>*</span></h6>
                <div class="px-3 paddedInput" >
                    <input class="mb-2 form-control smalltext" type="text" name="surname" placeholder="Enter Surname" /> 
                </div>
            </div>
            <div class="row px-1 smalltext" > 
                <div className="smalltext">
                        <h6 className="smalltext">Gender : <span className="px-1 py-2" style={{color:'red'}}>*</span> 
                            <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="genderp" id="inlineRadio3"  />
                            <label class="form-check-label smalltext" for="inlineRadio3">Female</label>
                            </div>
                            <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="genderp" id="inlineRadio4"  />
                            <label class="form-check-label smalltext" for="inlineRadio4">Male</label>
                            </div>
                        </h6>
                </div>
                
            </div>
            <div class="row smalltext" > 
                <h6 class="px-3 smalltext">Email Address : <span className="px-1" style={{color:'red'}}>*</span></h6>
                <div class="px-3 paddedInput" >
                    <input class="mb-2 form-control smalltext" type="text" name="Email" placeholder="Enter Email Address" /> 
                </div>
            </div>
            <div class="row smalltext" > 
                <h6 class="px-3 smalltext">Password : <span className="px-1" style={{color:'red'}}>*</span></h6>
                <div class="px-3 paddedInput" >
                    <span style={{display:'flex',justifyContent:'space-around'}} >
                    <input  ref={Passref} class="mb-2 form-control smalltext" type="password" name="password" placeholder="Enter Password" /> 
                    <PasswordView Passref={Passref} />
                    </span>
                </div>
            </div>
            <div class="row smalltext" > 
                <h6 class="px-3 smalltext">Phone Number :</h6>
                <div class="px-3 paddedInput" >
                    <input class="mb-2 form-control smalltext" type="number" name="phone" placeholder="Enter Phone Number" /> 
                </div>
            </div>
            <div className="row smalltext">
                <h6 class="px-3 smalltext"> How did you hear about us?  </h6>
                <div class="px-3 paddedInput" >
                    <select class="form-select smalltext mb-2" aria-label="Default select example">
                        <option selected>Select Source</option>
                        <option value="1">Search Engine</option>
                        <option value="2">Social Media</option>
                        <option value="3">Friend</option>
                    </select>
                </div>
            </div>
            </form>
        </div>
        </div>
    )
}

export default Parent
