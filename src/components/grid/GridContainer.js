import React from 'react';

import './grid.css'
import axios from 'axios';
import ReactPlayer from 'react-player'

export class GridContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mediaList: [],
            host: 'http://10.0.0.2:4000',
            idHash: ''
        };

        this.openMedia = this.openMedia.bind(this);
    }

    getData(scope) {
        debugger
        //http://localhost:4000/getData/?number=2 //desarrollo
        axios.get(this.state.host + '/getMediaList')
            .then(function (response) {
                // handle success

                console.log(response);
                scope.setState({ mediaList: response.data })
            })
    }

    componentWillMount() {
        this.getData(this);
        //this.setState({ mediaList: "this.res" })
    }

    openMedia(hash) {
        this.setState({idHash : hash});
    }

    render() {
        return (
            <div>
                <ReactPlayer url={"http://10.0.0.2:4000/getData/?mediahash=" + this.state.idHash} controls={true} playing />
                <div className="grid-container">
                    {this.state.mediaList.map((el) => (<div className="gid-media-card" onClick={() => this.openMedia(el.hashId)}><img src={this.state.host + el.tumbnail} /></div>))}
                </div>
            </div>
        );
    }
}