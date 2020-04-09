import React from 'react';
//import foldericon from '../../icons/folder_open-24px.svg';
import { Spinner } from 'react-bootstrap';

import axios from 'axios';

export class GridItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tumbnailIsReady: false }
        this.clickHandle = this.clickHandle.bind(this);
        this.tumbNailIsReadyHandle = this.tumbNailIsReadyHandle.bind(this);
        this.myRef = React.createRef();
        this.focusElement =this.focusElement.bind(this);
    }

    focusElement() {
        this.myRef.current.focus();
      }

    componentDidMount() {
        var tumbnailIsReady = setInterval(() => {
            if (!this.state.tumbnailIsReady) {
                this.tumbNailIsReadyHandle();
            }
            else {
                clearInterval(tumbnailIsReady);
            };
        }, 1000);
    }

    tumbNailIsReadyHandle() {
        var scope = this;
        axios.get(this.props.img)
            .then(function (response) {
                // handle success
                if (response.status === 200) {
                    scope.setState({ tumbnailIsReady: true })
                }
            })
    }

    clickHandle() {
        this.props.callback(this.props.fileData);
    }

    render() {
        return (
            <div className={"gid-media-card "+this.props.className} tabIndex={this.props.tabIndex} onClick={this.clickHandle} ref={this.myRef}  >
                <div className="media-img">
                <div className="grid-card-title" alt={this.props.title.substring(0, 40)}><span>{this.props.title.substring(0, 10)} </span></div>
                {this.state.tumbnailIsReady ?
                    <img alt={this.props.title.substring(0, 40)}  src={this.props.img} /> :
                    <Spinner animation="grow" variant="info" />}
                    </div>
            </div>
        );
    }

}



