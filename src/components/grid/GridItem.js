import React from 'react';
//import foldericon from '../../icons/folder_open-24px.svg';
import { Spinner } from 'react-bootstrap';

import axios from 'axios';

export class GridItem extends React.Component {

    constructor(props) {
        super(props);
        this.deadCallCount = 0;
        this.state = { tumbnailIsReady: false }
        this.thumbNailHasBeenCalled = false;
        this.clickHandle = this.clickHandle.bind(this);
       // this.tumbNailIsReadyHandle = this.tumbNailIsReadyHandle.bind(this);
        this.myRef = React.createRef();
        this.focusElement = this.focusElement.bind(this);
        this.isHide = this.isHide.bind(this);
        this.generateTumbnail = this.generateTumbnail.bind(this);
    }

    focusElement() {
        this.myRef.current.focus();
    }

    componentDidMount() {
        if (!this.isHide()) this.generateTumbnail();
    }

    // tumbNailIsReadyHandle() {
    //     //need a refactory
    //     if (!this.isHide()) {
    //         var scope = this;
    //         axios.get(this.props.img)
    //             .then(function (response) {
    //                 // handle success
    //                 if (response.status === 200) {
    //                     console.log("imagen ready");
    //                     scope.setState({ tumbnailIsReady: true })
    //                 }
    //             }).catch(err=>{
    //                 scope.deadCallCount++;
    //                 console.log("dead count: ", scope.deadCallCount);
    //             })
    //     }
    // }

    componentDidUpdate(prevProps) {
        if (!this.isHide()) this.generateTumbnail();
    }

    generateTumbnail() {
        let scope = this;
        if(!this.state.tumbnailIsReady){
        axios.post('/generateTumbnail', { hashId: this.props.fileData.hashId })
            .then(function (response) {
                scope.thumbNailHasBeenCalled = true;
                scope.setState({ tumbnailIsReady: true })
                //console.log(scope.props.fileData.hashId);
                //console.log("response: ", response);
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
            <div className={"grid-media-card " + this.props.className} tabIndex={this.props.tabIndex} onClick={this.clickHandle} ref={this.myRef}  >
                <div className={"media-img "+(!this.state.tumbnailIsReady?"full-width":"")}>
                    <div className="grid-card-title" alt={this.props.title.substring(0, 40)}><span>{this.props.title.substring(0, 10)} </span></div>
                    {this.state.tumbnailIsReady ?
                        <img alt={this.props.title.substring(0, 40)} src={this.props.img} /> :
                        <div className="snipper"><Spinner animation="grow" variant="info" /></div>}
                </div>
            </div>
        );
    }

}



