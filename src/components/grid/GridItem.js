import React from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';

export class GridItem extends React.Component {

    constructor(props) {
        super(props);
        this.deadCallCount = 0;
        this.state = { ThumbnailIsReady: false }
        this.thumbNailHasBeenCalled = false;
        this.clickHandle = this.clickHandle.bind(this);
        this.myRef = React.createRef();
        this.focusElement = this.focusElement.bind(this);
        this.generateThumbnail = this.generateThumbnail.bind(this);
    }

    focusElement() {
        this.myRef.current.focus();
    }

    componentDidMount() {
        this.generateThumbnail();
    }

    generateThumbnail() {
        let scope = this;
        if(!this.state.ThumbnailIsReady){
        axios.post('/generateThumbnail', { hashId: this.props.fileData.hashId })
            .then(function (response) {
                scope.thumbNailHasBeenCalled = true;
                scope.setState({ ThumbnailIsReady: true })
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    clickHandle() {
        this.props.callback(this.props.fileData);
    }

    render() {
        return (
            <div className={"grid-media-card " + this.props.className} tabIndex={this.props.tabIndex} onClick={this.clickHandle} ref={this.myRef}  >
                <div className={"media-img "+(!this.state.ThumbnailIsReady?"full-width":"")}>
                    <div className="grid-card-title" alt={this.props.title.substring(0, 40)}><span>{this.props.title.substring(0, 10)} </span></div>
                    {this.state.ThumbnailIsReady ?
                        <img alt={this.props.title.substring(0, 40)} src={this.props.img} /> :
                        <div className="snipper"><Spinner animation="grow" variant="info" /></div>}
                </div>
            </div>
        );
    }

}



