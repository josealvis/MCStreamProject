import React from 'react';

import './grid.css'
import axios from 'axios';

import { GridItem } from './GridItem';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


export class GridContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mediaList: [],
            idHash: '',
            videoTitle: '',
            modal: false,
            rowNum: 1,
            nsfw: false
        };
        this.openMedia = this.openMedia.bind(this);
        this.nsfwToggle = this.nsfwToggle.bind(this);
    }

    getData(scope) {
        axios.get('/getMediaList/?rowNum=' + this.state.rowNum)
            .then(function (response) {
                // handle success
                scope.setState({ mediaList: response.data })
            })
    }

    componentDidMount() {
        this.getData(this);

        //this.setState({ mediaList: "this.res" })
    }

    openMedia(vidMetaData) {
        this.setState({ idHash: vidMetaData.hashId });
        this.setState({ videoTitle: vidMetaData.name });
        this.setState({ modal: true });

    }

    closeMediaHandle() {
        this.setState({ idHash: '' });
        this.setState({ modal: false });
    }

    nsfwToggle() {
        this.setState({ nsfw: !this.state.nsfw });
    }

    render() {
        return (
            <div>
                <VideoPlayer videohash={this.state.idHash}
                    isOpen={this.state.modal}
                    closeModal={() => this.closeMediaHandle()}
                    title={this.state.videoTitle} />
                <FormControlLabel
                    control={
                        <Switch checked={this.state.nsfw} onChange={this.nsfwToggle} value="" />
                    }
                    label="NSFW mode"
                />
                <div className="grid-container">
                    {this.state.mediaList.map((el) => (<>{!el.nsfw || this.state.nsfw?<GridItem
                        key={el.hashId.toString()}
                        callback={this.openMedia}
                        hashId={el.hashId}
                        fileData={el}
                        img={el.tumbnail}
                        title={el.name}
                    /> :<></>}
                    </>))}
                </div>
            </div>
        );
    }
}