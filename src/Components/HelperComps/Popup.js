import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import submitsuccess from '../../images/submitsuccess.png';
import { useHistory, useLocation } from 'react-router-dom';

function Popup(props) {
    //returnStateHandler(clickedyes,clickedclose)
  const {title,body,from,returnStateHandler} = props
  const [show, setShow] = useState(true);
  const history = useHistory();

  const handleClose = () => {
      setShow(false);
      //if(returnStateHandler!=undefined)
        returnStateHandler(false,false)
    
    };

  
    return (
             <>
                <Modal show={show} onHide={handleClose} style={{zIndex:5000}}>
                    <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:from == "Error"?'red':''}}>
                       
                        {
                            from=="report" &&
                            <>
                                {
                                    <i style={{fontSize:'148px',color:'green'}} class="fa fa-check-circle" aria-hidden="true"></i>
                                }
                            </>
                        }
                        <p></p>
                        {body}
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            (from == "test") && 
                        <>
                            <Button variant="danger" onClick={()=>{returnStateHandler(true,false);handleClose();}}>
                                Yes
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </>
                        }
                        {
                            (from == "NeedPleaseLogin") && 
                        <>
                            <Button variant="success" onClick={()=>{history.push('/login')}}>
                                Please login
                            </Button>
                        </>
                        }
                        {
                            (from == "NeedPleaseRegister") && 
                        <>
                            <Button variant="success" onClick={()=>{history.push('/')}}>
                                Please register
                            </Button>
                        </>
                        }
                        {
                            (from != "test" ) && 
                        <>
                            <Button variant="secondary" onClick={()=>{returnStateHandler(true,false);handleClose();}}>
                                Close
                            </Button>
                        </>
                        }
                        
                    </Modal.Footer>
                </Modal>
            </>
    )
}

export default Popup
