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
            <div className="gid-media-card" onClick={this.clickHandle}>
                <div className="grid-card-title"><span>{this.props.title.substring(0, 40)} </span></div>
                {this.state.tumbnailIsReady ?
                    <img alt={this.props.title.substring(0, 40)} className="media-img" src={this.props.img} /> :
                    <Spinner animation="grow" variant="info" />}
            </div>
        );
    }

}



