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
            searchText:"",
            mediaList:[],
        }
        this.inputPathChangeHandler = this.inputPathChangeHandler.bind(this);

    }
    
    searchBtn(){
        var scope = storage.appStates.getComponentScope("GridContainerStates");
        let text = this.state.searchText.toLocaleLowerCase();
        var repoList = storage.getRepos();
        let media = this.searchMedia(repoList);
        let result = media.filter((el)=>el.name.toLowerCase().includes(text));
        scope.setState({mediaDir:result},function(){
            scope.setState({mediaContainerMode:true});
            scope.setState({mediaDirName:"Search Results."});
        });
       
    }

    searchMedia(repoList){
     return repoList.reduce((arr,el)=>{
         if(el.media.length>0)arr =[...arr, ...el.media];
         return arr;
     },[]);
    }

    inputPathChangeHandler(event) {
        this.setState({ searchText: event.target.value });
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.searchBtn();
        }
    }

    render() {
        return (<div className="search-box-container">
                        <TextField className="search-box" id="standard-basic" placeholder="Search" variant="outlined"
                            onChange={this.inputPathChangeHandler}
                            onKeyPress={this.handleKeyPress.bind(this)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" >
                                        <Divider orientation="vertical" />
                                        <IconButton  onClick={this.searchBtn.bind(this)}  color="primary" aria-label="directions">
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>)
    }
} 