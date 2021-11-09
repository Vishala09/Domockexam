import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

function Popup(props) {
    //returnStateHandler(clickedyes,clickedclose)
  const {title,body,returnStateHandler} = props
  const [show, setShow] = useState(true);

  const handleClose = () => {setShow(false);returnStateHandler(false,false)};

  
    return (
             <>
                <Modal show={show} onHide={handleClose} style={{zIndex:5000}}>
                    <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{body}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={()=>{returnStateHandler(true,false);handleClose();}}>
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
    )
}

export default Popup
