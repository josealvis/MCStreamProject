import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button, IconButton } from '@material-ui/core/';

export class CofirmationModal extends React.Component {
    constructor(props) {
        super(props);
        this.style = props.className ? props.className : 'btn btn-primary';

        this.state = {
            modalIsOpen: false,
        }
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler() {
        this.setState({ modalIsOpen: !this.state.modalIsOpen });
    }

    close() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (<>
            <button type="button" class={this.style} onClick={this.onClickHandler} >
                {this.props.children}
            </button>

            <Modal
                aria-labelledby=""
                dialogClassName=""
                backdropClassName=""
                centered
                show={this.state.modalIsOpen} onHide={() => this.close()}>
                <Modal.Header closeButton>
                    <Modal.Title id="">{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Are you sure?</h3>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="contained" color="secondary"  onClick={() => this.close()}>Close</Button>
                    <Button  onClick={()=>{this.props.onClickOK();this.close();} }>Save changes</Button>
                </Modal.Footer>
            </Modal></>)
    }
}