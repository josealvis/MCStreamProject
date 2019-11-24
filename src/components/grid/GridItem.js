import React from 'react';
import foldericon from '../../icons/folder_open-24px.svg';
import { Spinner } from 'react-bootstrap';



import axios from 'axios';

export class GridItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tumbnailIsReady: false }
        this.clickHandle = this.clickHandle.bind(this);
        this.tumbNailisReadyHandle = this.tumbNailisReadyHandle.bind(this);
    }

    componentDidMount() {
        var tumbnailIsReady = setInterval(() => {
            if (!this.state.tumbnailIsReady) {
                this.tumbNailisReadyHandle();
            }
            else {
                clearInterval(tumbnailIsReady);
                console.log("interval cleared");
            };
        }, 1000);
    }

    tumbNailisReadyHandle() {
        var scope = this
        axios.get(this.props.img)
            .then(function (response) {
                // handle success
                if (response.status == 200) {
                    console.log(response);
                    scope.setState({ tumbnailIsReady: true })
                }
            })
    }

    clickHandle() {
        this.props.callback(this.props.fileData);
    }


    render() {
        return (<div className="gid-media-card" onClick={this.clickHandle}>
            <div className="grid-card-title"><span>{this.props.title.substring(0, 40)} </span></div>
            { this.state.tumbnailIsReady ? <img className="media-img" src={this.props.img} />:
            <Spinner animation="grow" variant="info" />}
        </div>);
    }

}



