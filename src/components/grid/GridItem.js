import React from 'react';
//import foldericon from '../../icons/folder_open-24px.svg';
import { Spinner } from 'react-bootstrap';

import axios from 'axios';

export class GridItem extends React.Component {

    constructor(props) {
        super(props);
        this.deadCallCount=0;
        this.state = { tumbnailIsReady: false }
        this.thumbNailHasBeenCalled = false;
        this.clickHandle = this.clickHandle.bind(this);
        this.tumbNailIsReadyHandle = this.tumbNailIsReadyHandle.bind(this);
        this.myRef = React.createRef();
        this.focusElement = this.focusElement.bind(this);
        this.isHide = this.isHide.bind(this);
        this.generateTumbnail = this.generateTumbnail.bind(this);
    }

    focusElement() {
        this.myRef.current.focus();
    }

    componentDidMount() {
        var tumbnailIsReady = setInterval(() => {
            if (this.deadCallCount <10 &&!this.state.tumbnailIsReady) {
                this.tumbNailIsReadyHandle();
            }
            else {
                clearInterval(tumbnailIsReady);
                if(this.deadCallCount==10)console.log("Thumbnail dead call mediaId:",this.props.fileData.hashId);
            };
        }, 1000);
    }

    tumbNailIsReadyHandle() {
        //need a refactory
        if (!this.isHide()) {
            this.generateTumbnail();
            var scope = this;
            axios.get(this.props.img)
                .then(function (response) {
                    // handle success
                    if (response.status === 200) {
                        console.log("imagen ready");
                        scope.setState({ tumbnailIsReady: true })
                    }
                }).catch(err=>{
                    scope.deadCallCount++;
                    console.log("dead count: ", scope.deadCallCount);
                })
        }
    }

    generateTumbnail() {
        let scope = this;
        if (!this.thumbNailHasBeenCalled) {
            axios.post('/generateTumbnail', { hashId: this.props.fileData.hashId })
                .then(function (response) {
                    scope.thumbNailHasBeenCalled = true;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    clickHandle() {
        this.props.callback(this.props.fileData);
    }

    isHide() {
        return !this.props.nsfwMode && this.props.fileData.nsfw;
    }

    render() {
        return (
            <div className={"gid-media-card " + this.props.className} tabIndex={this.props.tabIndex} onClick={this.clickHandle} ref={this.myRef}  >
                <div className="media-img">
                    <div className="grid-card-title" alt={this.props.title.substring(0, 40)}><span>{this.props.title.substring(0, 10)} </span></div>
                    {this.state.tumbnailIsReady ?
                        <img alt={this.props.title.substring(0, 40)} src={this.props.img} /> :
                        <Spinner animation="grow" variant="info" />}
                </div>
            </div>
        );
    }

}



