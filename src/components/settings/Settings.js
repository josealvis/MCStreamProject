import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';

import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { Button as MButton } from '@material-ui/core/';
import { CofirmationModal } from '../common/ConfirmationModal';


function PathItem(props) {

    function updateElement() {
        props.onChangeHandler(props.element)
    }

    function onChangeHandler(event, propName) {

        props.element[propName] = event.target.value;
        updateElement();
    }

    return (<InputGroup className="mb-3">
        <FormControl
            placeholder="Display Name"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(event) => { onChangeHandler(event, 'displayName') }}
            value={props.element.displayName}
        />
        <FormControl
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(event) => { onChangeHandler(event, 'path') }}
            value={props.element.path}
        />
        <InputGroup.Append>
            <Button onClick={() => { props.element.nsfw = !props.element.nsfw; updateElement() }} variant={props.element.nsfw ? "dark" : "outline-dark"} >{props.element.nsfw ? "NSFW" : "SFW"}</Button>
            <Button onClick={() => { props.element.deleted = true; updateElement() }} variant="outline-secondary" >Delete</Button>
        </InputGroup.Append>
    </InputGroup>);
}

export class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: { path: '', displayName: '', nsfw: false },
            configObj: { paths: [], },
        }

        this.addNewFolderPath = this.addNewFolderPath.bind(this);
        this.inputPathChangeHandler = this.inputPathChangeHandler.bind(this);
        this.nswfToggle = this.nswfToggle.bind(this);
        this.getFolderPaths = this.getFolderPaths.bind(this);
        this.saveCongfigHandler = this.saveCongfigHandler.bind(this);
        this.updateStateHandler = this.updateStateHandler.bind(this);
    }

    componentDidMount() {
        this.getFolderPaths();
    }

    addNewFolderPath(scope) {
        this.state.path.path = this.state.path.path.replace(/\\/g, '/')
        this.state.configObj.paths.push(this.state.path);
        this.setState({ configObj: this.state.configObj });

        // axios.post('/addPath', this.state.path)
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }

    getFolderPaths() {
        var scope = this;
        axios.get('/getMediaPath')
            .then(function (response) {
                var cf = scope.state.configObj;
                cf.paths = response.data;
                scope.setState({ configObj: cf });
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

    saveCongfigHandler() {
       
        swal({
            title: "Are you sure?",
            text: "Save anyway!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.post('/saveConfig', this.state.configObj)
                .then(function (response) {
                    swal("Saved!", "You config is saved!", "success");
                    console.log(response);
                })
                .catch(function (error) {
                    swal ( "Oops" ,  "Something went wrong!" ,  "error" );
                    console.log(error);
                });
            } 
          });


    }

    updateStateHandler(path) {
        debugger
        this.state.configObj.paths = this.state.configObj.paths.filter(el => !el.deleted);
        this.setState({ configObj: this.state.configObj });
    }

    render() {
        return (<div className="container">
            <div className="st-box">
                <h2>Add folder paths</h2>
                <div className="input-container-path">

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
                    {this.state.configObj.paths.map((el, idex) => (<PathItem onChangeHandler={this.updateStateHandler} key={idex} element={el} path={el.path} nsfw={el.NSFW} />))}
                    <MButton onClick={this.saveCongfigHandler} variant="contained" color="secondary" >Save config</MButton>

                </div>
            </div>
        </div>);
    }
}