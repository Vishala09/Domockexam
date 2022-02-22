import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import instruction1 from '../../images/Instruction1.png';

function Instructions(props) {
    const {TestDetails,TotalQuestions} = props;

    return (
        <div>
           
            <Card>
            <Card.Body>
                <Card.Title className="text-center">Read the following instructions carefully </Card.Title>
                <Card.Text>
                    <ListGroup>
                        <ListGroup.Item>Please answer all the questions.</ListGroup.Item>
                        <ListGroup.Item>This exam contains {TotalQuestions} questions, and you will have {TestDetails?.duration} minutes to finish the exam</ListGroup.Item>
                        <ListGroup.Item>Timer on the screen will display the remaining time. The exam will end automatically when the timer shows zero duration or when you submit your exam whichever comes first.</ListGroup.Item>
                        <ListGroup.Item>You can change your answer any time during the exam by coming back to the question before you submit or exam ends. You can mark a question to review later by clicking the Mark for review button. </ListGroup.Item>
                        <ListGroup.Item>A question palette is given in the right side of your screen. Questions are grouped in to sections and each section has number of questions. You can visit any sections or questions in the sections by going to the question palette</ListGroup.Item>
                        <ListGroup.Item>In the question palette section numbers are in indicated by I, II, III, IV etc. (Roman Numbering) format and question numbers are indicated by  01, 02, 03,04, etc. format.  If a question has sub question(s) then sub question numbered are indicated by 1, 2, 3, 4, etc. format.  Status for each question is indicated by different colour code. By clicking Amber Mark button in Amber , you can mark any question to review
                                <div>
                                    <img src={instruction1} height='300px' />
                                    <ul>
                                        <li>Answered – You have answered the question (Blue)</li>
                                        <li>Not Answered – You have not answered the question (Grey)</li>
                                        <li>Not visited – you have not seen the question yet (Black)</li>
                                        <li>Selected – You are in the selected question (White)</li>
                                        <li>Marked- you have marked for review later (Amber with Red Flag)</li>
                                    </ul>
                                </div>
                        </ListGroup.Item>
                        <ListGroup.Item>Questions numbers in question palette may have combinations of one or more colours depend on the above scenario  </ListGroup.Item>
                        <ListGroup.Item>Please keep blank papers, pencil and eraser with you in case if you need for your rough work.</ListGroup.Item>
                        <ListGroup.Item>You are NOT allowed to use books, notes, calculators or other electronic devices for the purposed of derive the answers. </ListGroup.Item>
                        <ListGroup.Item>For better exam experience please use a Desktop or Laptop with stable internet connection.</ListGroup.Item>
                        
                    </ListGroup>
                </Card.Text>
                <Card.Text>
                    <b><em>Good Luck!</em></b>
                </Card.Text>
            </Card.Body>
            </Card>
        </div>
    )
}

export default Instructions
