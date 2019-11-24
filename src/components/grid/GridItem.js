import React from 'react';
import foldericon from '../../icons/folder_open-24px.svg';

export class GridItem extends React.Component {

    constructor(props) {
        super(props);
        this.clickHandle = this.clickHandle.bind(this);
    }

    componentWillMount() {
        //this.getData();
        //this.setState({ res: "klk" })
    }

    clickHandle() {
        this.props.callback(this.props.fileData);

    }


    render() {
        return (<div className="gid-media-card"  onClick={this.clickHandle}>
       <div class="grid-card-title"><span>{this.props.title.substring(0,40)} </span></div>
            <img className="media-img" src={this.props.hashId!=undefined? this.props.img :foldericon } />
        </div>);
    }

}



