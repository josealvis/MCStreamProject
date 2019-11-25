import React , { useState } from 'react';

import './grid.css'
import axios from 'axios';
import ReactPlayer from 'react-player'

import {GridItem} from './GridItem';
import {VideoPlayer} from '../VideoPlayer/VideoPlayer';


export class GridContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mediaList: [],
            idHash: '',
            videoTitle:'',
            modal: false,
            rowNum :1
        };


        this.openMedia = this.openMedia.bind(this);
    }

    getData(scope) {
        debugger
        axios.get('/getMediaList/?rowNum='+this.state.rowNum)
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

    openMedia(vidMetaData) {
        this.setState({idHash : vidMetaData.hashId});
        this.setState({videoTitle : vidMetaData.name});
        this.setState({modal : true});

    }
    closeMediaHandle() {
        this.setState({idHash : ''});
        this.setState({modal : false});
    }



    render() {
        return (
            <div>
                <VideoPlayer videHash ={this.state.idHash} 
                isOpen={this.state.modal} 
                closeModal={()=>this.closeMediaHandle()}
                title={this.state.videoTitle}/>
                <div className="grid-container">
                    {this.state.mediaList.map((el) => (<GridItem 
                    key={el.hashId}
                    callback={this.openMedia} 
                    hashId={el.hashId}
                    fileData ={el}  
                    img={el.tumbnail}
                    title ={el.name}
                     />))}
                </div>
            </div>
        );
    }
}