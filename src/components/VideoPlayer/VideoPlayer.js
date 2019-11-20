import React from 'react';
import ReactPlayer from 'react-player'
import {useParams} from "react-router-dom";


export class VideoPlayer extends React.Component{
    render(){
        let { id } = useParams();
        return(<div>

            <ReactPlayer url={"http://10.0.0.2:4000/getData/?mediahash=" + id} controls={true} playing />
        </div>);
    }
}