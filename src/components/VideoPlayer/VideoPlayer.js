import React, { useState } from 'react';
import ReactPlayer from 'react-player'
import { useParams } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';


function Modald(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
        </Button>

            <Modal show={props.isOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body> <ReactPlayer url={"http://10.0.0.2:4000/getData/?mediahash=" + props.videHash} controls={true} playing /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
            </Button>
                </Modal.Footer>
            </Modal>
        </>
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