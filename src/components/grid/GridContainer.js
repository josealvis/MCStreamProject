import React from 'react';
import { storage } from '../../helpers/storage';

import './grid.css'
import axios from 'axios';

import { GridItem } from './GridItem';
import { MediaRiel } from './MediaRiel';
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
            nsfw: false,
            selectedCardId: "",
            elements: [],
            tabIndex: -1
        };




        this.openMedia = this.openMedia.bind(this);
        this.nsfwToggle = this.nsfwToggle.bind(this);
        this.setMediaStates = this.setMediaStates.bind(this);
    }

    getData(scope) {
        axios.get('/getDataObject')
            .then(function (response) {
                // handle success
                storage.repos = response.data;
                scope.setState({ mediaList: storage.repos })
            })
    }


    componentDidMount() {
        this.getData(this);
    }

    setMediaStates(vidMetaData) {
        this.setState({ idHash: vidMetaData.hashId });
        this.setState({ videoTitle: vidMetaData.name });
    }

    openMedia(vidMetaData, modal = true) {
        if (vidMetaData != undefined) this.setMediaStates(vidMetaData);
        this.setState({ modal });
    }

    closeMediaHandle() {
        this.setState({ idHash: '' });
        this.setState({ modal: false });
    }

    nsfwToggle() {
        this.setState({ nsfw: !this.state.nsfw });
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.setState({ modal: true });
        }
    }

    render() {
        return (
            <div className="media-grid-container" onKeyPress={this.handleKeyPress.bind(this)}>
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
                <div className="media-grid-container" onKeyPress={this.handleKeyPress.bind(this)}>
                    {this.state.mediaList.map((car,i) => (
                        <MediaRiel key={i} nsfwMode={this.state.nsfw} media={car.media} repoName={car.repo} openMedia={this.openMedia}>
                        </MediaRiel>))}
                </div>
            </div >
        );
    }
}