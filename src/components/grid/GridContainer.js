import React from 'react';
import { storage } from '../../helpers/storage';

import './grid.scss'
import axios from 'axios';

import { MediaRail } from './MediaRail';
import { MediaContainer } from './MediaContainer';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


export class GridContainer extends React.Component {

    constructor(props) {
        super(props);
        storage.bindComponentToStorage("GridContainerStates",this);
        this.state = {
            mediaList: [],
            mediaDir: [],
            mediaDirName:"",
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
        if (vidMetaData !== undefined) this.setMediaStates(vidMetaData);
        this.setState({ modal });
    }

    closeMediaHandle() {
        this.setState({ idHash: '' });
        this.setState({ modal: false });
    }

    nsfwStateHandler() {
        let nsfw = this.state.nsfw;
        let repos = storage.getRepos();
        // console.log("repos false: ", repos[0])
        // repos = repos.reduce((el, next) => {
        //     if (nsfw || !next.nsfw) {
        //         if (next.media.length > 0 && !nsfw) {
        //             next.media = next.media.reduce((ac, i) => {
        //                 if (!i.nsfw) ac = [...ac, i];
        //                 return ac;
        //             }, []);
        //         }
        //         el = [...el, next];
        //     }
        //     return el;
        // }, []);
        // console.log(repos);
        this.setState({ mediaList: repos })
    }

    nsfwToggle() {
        let nsfw = !this.state.nsfw;
        storage.nsfwMode = nsfw;
        this.setState({ nsfw }, this.nsfwStateHandler);
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.setState({ modal: true });
        }
    }

    openDirHandler(hashId) {
        // it should be an Id insted of repo
        let repo = this.state.mediaList.find(el => el.hashId === hashId);
        if (repo.media !== undefined) this.setState({ mediaDir:repo.media },()=>{
            this.setState({ mediaContainerMode: true });
            this.setState({ mediaDirName: repo.repo  });
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
                        <MediaRail key={i} nsfw={car.nsfw} repoName={car.repo} openDir={this.openDirHandler} media={car.media} repoId={car.hashId} openMedia={this.openMedia}>
                        </MediaRail>)) : <></>}
                    {this.state.mediaContainerMode && this.state.mediaList[0] ? <MediaContainer
                        nsfwMode={true}
                        goBackFn={this.gohome.bind(this)}
                        media={this.state.mediaDir}
                        repoName={this.state.mediaDirName}
                        openMedia={this.openMedia}>
                    </MediaContainer> : <></>}

                </div>
            </div >
        );
    }
}