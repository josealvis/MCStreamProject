import React from 'react';
import { storage } from '../../helpers/storage';

import './grid.css'
import axios from 'axios';

import { GridItem } from './GridItem';
import { MediaRiel } from './MediaRiel';
import { MediaContainer } from './MediaContainer';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


export class GridContainer extends React.Component {

    constructor(props) {
        super(props);
        storage.setComponetScope("GridContainerStates",this);
        this.state = {
            mediaList: [],
            mediaDir: [],
            idHash: '',
            videoTitle: '',
            modal: false,
            rowNum: 1,
            nsfw: false,
            selectedCardId: "",
            elements: [],
            tabIndex: -1,
            mediaContainerMode: false,
        };

        
        this.openMedia = this.openMedia.bind(this);
        this.nsfwToggle = this.nsfwToggle.bind(this);
        this.setMediaStates = this.setMediaStates.bind(this);
        this.nsfwStateHandler = this.nsfwStateHandler.bind(this);
        this.openDirHandler = this.openDirHandler.bind(this);
    }

    getData(scope) {
        axios.get('/getDataObject')
            .then(function (response) {
                storage.setRepos(response.data);
                scope.nsfwStateHandler();
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

    nsfwStateHandler() {
        let nsfw = this.state.nsfw;
        console.log("store repo: ", storage.repos)
        let repos = storage.getRepos();
        repos = repos.reduce((el, next) => {
            if (nsfw || !next.nsfw) {
                if (next.media.length > 0 && !nsfw) {
                    next.media = next.media.reduce((ac, i) => {
                        if (!i.nsfw) ac = [...ac, i];
                        return ac;
                    }, []);
                }
                el = [...el, next];
            }
            return el;
        }, []);
        console.log(repos);
        this.setState({ mediaList: repos })
    }

    nsfwToggle() {
        let nsfw = !this.state.nsfw;
        this.setState({ nsfw }, this.nsfwStateHandler);
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.setState({ modal: true });
        }
    }

    openDirHandler(repoName) {
        // it should be an Id insted of repo
        let mediaDir = this.state.mediaList.find(el => el.repo == repoName).media;
        if (mediaDir != undefined) this.setState({ mediaDir },()=>{
            this.setState({ mediaContainerMode: true });
        })
 
    }

    gohome() {
        this.setState({ mediaContainerMode: false })
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
                    {!this.state.mediaContainerMode ? this.state.mediaList.map((car, i) => (
                        <MediaRiel key={i} openDir={this.openDirHandler} media={car.media} repoName={car.repo} openMedia={this.openMedia}>
                        </MediaRiel>)) : <></>}
                    {this.state.mediaContainerMode && this.state.mediaList[0] ? <MediaContainer
                        nsfwMode={true}
                        goBackFn={this.gohome.bind(this)}
                        media={this.state.mediaDir}
                        repoName={this.state.mediaList[0].repo}
                        openMedia={this.openMedia}>
                    </MediaContainer> : <></>}

                </div>
            </div >
        );
    }
}