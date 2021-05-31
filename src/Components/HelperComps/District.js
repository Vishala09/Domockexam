import React, { useState } from 'react'

function District(props) {

    const [Districts, setDistricts] = useState(['Ampara','Anuradhapura','Badulla','Batticaloa','Colombo','Galle','Gampaha','Hambantota','Jaffna',
            'Kalutara','Kandy','Kegalle','Kilinochchi','Kurunegala','Mannar','Matale','Matara','Monaragala','Mullaitivu','Nuwara Eliya',
        'Polonnaruwa','Puttalam','Ratnapura','Trincomalee','Vavuniya'])
    return (
        <div className="row smalltext">
                    <h6 class="px-3 smalltext"> District Name :</h6>
                    <div class="px-3 paddedInput" >
                    <input class="mb-1 form-control smalltext" list="districts" type="text" value={props.Data.district} name="district" 
                        onChange={(e)=>{props.setData({...props.StudentData,district:e.target.value})}} placeholder="Select District" />
                            <datalist id="districts">
                            {
                                Districts.map((dis)=><option>{dis}</option>)
                            }
                            </datalist>
                        {/* <select value={props.Data.district} data-live-search="true" class="form-select selectpicker smalltext mb-2" 
                        name="district"
                        onChange={(e)=>{props.setData({...props.StudentData,district:e.target.value})}} aria-label="Default select example">
                            <option><input type="text" value="" /></option>
                            <option selected>Select District</option>
                            {
                                Districts.map((dis)=><option>{dis}</option>)
                            }
                        </select> */}
                    </div>
                </div>
    )
}

export default District
