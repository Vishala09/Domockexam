import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function Instructions() {
    return (
        <div>
           
            <Card>
            <Card.Body>
                <Card.Title className="text-center"> Instructions</Card.Title>
                <Card.Text>
                    <ListGroup>
                        <ListGroup.Item>नमस्ते</ListGroup.Item>
                        <ListGroup.Item>வணக்கம்</ListGroup.Item>
                        <ListGroup.Item>ආයුබෝවන්</ListGroup.Item>
                        <ListGroup.Item>There are no negative marks</ListGroup.Item>
                        <ListGroup.Item>Multiple Choice: Click the radio button to indicate your choice</ListGroup.Item>
                        <ListGroup.Item>True/False: Click the radio button to indicate your choice</ListGroup.Item>
                        <ListGroup.Item>Match the following: Drag and drop in the right place</ListGroup.Item>
                        <ListGroup.Item>Gap Filling: Type the correct answer</ListGroup.Item>
                    </ListGroup>
                </Card.Text>
                
            </Card.Body>
            </Card>
        </div>
    )
}

export default Instructions
