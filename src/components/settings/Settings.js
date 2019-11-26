import React from 'react';
import axios from 'axios';

import { InputGroup, FormControl, Button } from 'react-bootstrap';


function PathItem(props) {

    return (<InputGroup className="mb-3">
        <FormControl
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(event)=>{console.log()}}
            value={props.path}
        />
        <InputGroup.Append>
            <Button variant={props.nsfw ? "dark" : "outline-dark"} >{props.nsfw ? "NSFW" : "SFW"}</Button>
            <Button variant="outline-secondary" >update</Button>
        </InputGroup.Append>
    </InputGroup>);
}

export class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: { path: '', displayName: '', nsfw: false },
            folderPaths: [],
        }

        this.addNewFolderPath = this.addNewFolderPath.bind(this);
        this.inputPathChangeHandler = this.inputPathChangeHandler.bind(this);
        this.nswfToggle = this.nswfToggle.bind(this);
        this.getFolderPaths = this.getFolderPaths.bind(this);
    }

    componentDidMount() {
        this.getFolderPaths();
    }

    addNewFolderPath(scope) {

        axios.post('/addPath', this.state.path)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getFolderPaths(){
        var scope = this;
        axios.get('/getMediaPath' )
            .then(function (response) {
                scope.setState({folderPaths:response.data});
            });
    }

    inputPathChangeHandler(event) {
        var path = { ...this.state.path, path: event.target.value }
        this.setState({ path: path });
    }


    nswfToggle() {
        var path = { ...this.state.path, nsfw: !this.state.path.nsfw }
        this.setState({ path: path });
    }


    render() {
        return (<div className="container">
            <div className="st-box">
                <h2>Add folder paths</h2>
                <div className="input-container-path">
                    <input directory="" webkitdirectory="" type="file" />
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={this.inputPathChangeHandler}
                            value={this.state.path.path}
                        />
                        <InputGroup.Append>
                            <Button variant={this.state.path.nsfw ? "dark" : "outline-dark"} onClick={this.nswfToggle} >{this.state.path.nsfw ? "NSFW" : "SFW"}</Button>
                            <Button variant="outline-secondary" onClick={this.addNewFolderPath}>add path</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {this.state.folderPaths.map((el,idex)=>(<PathItem key={idex} path={el.path} nsfw={el.NSFW}/>))}
                </div>
            </div>
        </div>);
    }
}