import React from 'react';
import { storage } from '../../helpers/storage';

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
            nsfw: false,
            selectedCardId: "",
            elements: [],
            tabIndex:0
        };
        
  


        this.openMedia = this.openMedia.bind(this);
        this.nsfwToggle = this.nsfwToggle.bind(this);
        this.selectCar = this.selectCar.bind(this);
        this.refCallBack = this.refCallBack.bind(this);
    }

    getData(scope) {
        axios.get('/getDataObject')
            .then(function (response) {
                // handle success

                console.log(response);
                storage.repos = response.data;
                scope.setState({ mediaList: response.data })


            })
        // axios.get('/getMediaList/?rowNum=' + this.state.rowNum)
        //     .then(function (response) {
        //         // handle success
        //         scope.setState({ mediaList: response.data })
        //     })
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

    selectCar(ref) {
        let elements = this.state.elements;
        let tabIndex = this.state.tabIndex;
        elements[tabIndex].myRef.current.focus();
        this.state.tabIndex +=1 ;
    }

    refCallBack(el) {
        let elements = this.state.elements;
        elements.push(el)
        this.setState({ elements});

    }

    render() {
        return (
            <div className="media-grid-container" ref='ok'>
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
                {this.state.mediaList.map(car => (<div className="repoContainer">
                    <div className="carrusel-top-bar">
                        <h2 >{car.repo}</h2>
                        <button onClick={this.selectCar}  > next</button>
                    </div>
                    <div className="grid-container">
                        {car.media.map((el, i) => (<>{!el.nsfw || this.state.nsfw ? <GridItem
                            ref={this.refCallBack}
                            tabindex={i}
                            key={el.hashId.toString()}
                            callback={this.openMedia}
                            hashId={el.hashId}
                            fileData={el}
                            img={el.tumbnail}
                            title={el.name}
                        /> : <></>}
                        </>))}
                    </div>
                </div>))}
            </div>
        );
    }
}