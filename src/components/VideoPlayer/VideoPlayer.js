import React, { useState } from 'react';
import ReactPlayer from 'react-player'
import { useParams } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import './style.css';


function Modald(props) {
    //const [show, setShow] = useState(false);

    //const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);

    const handleClose = () => props.closeModal();
    const handleShow = () => props.closeModal();

    return (
        <Modal  {...props}

            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="video-modal"
            backdropClassName="back-drop"
            centered
            show={props.isOpen} onHide={handleClose}>
            <Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <ReactPlayer url={"http://10.0.0.2:4000/getData/?mediahash=" + props.videHash} 
                    controls={true} height="600" width="750" playing />
                </div>
            </Modal.Body>
        </Modal>
    );
}



export class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div>
            <Modald {...this.props} />
        </div>);
    }
}