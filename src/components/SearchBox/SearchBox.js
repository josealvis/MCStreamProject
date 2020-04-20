import React from 'react';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { IconButton, TextField } from '@material-ui/core';
import { storage } from '../../helpers/storage';

export class SearchBox extends React.Component {
    constructor(porps) {
        super(porps);
        this.state ={
            mode:false,
        }
    }
    
    setMode(){
        console.log("store:",storage.appStates.GridContainerStates);
       
        //storage.appStates.GridContainerStates.scope.setState({mediaContainerMode:false});
        var scope = storage.appStates.getComponentScope("GridContainerStates");
        scope.setState({mediaContainerMode:false});
        this.setState({mode:!this.state.mode})
    }

    render() {
        return (<form noValidate autoComplete="off">
                        <TextField className="search-box" id="standard-basic" placeholder="Search 2" variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Divider orientation="vertical" />
                                        <IconButton  onClick={this.setMode.bind(this)}  color="primary" aria-label="directions">
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </form>)
    }
} 