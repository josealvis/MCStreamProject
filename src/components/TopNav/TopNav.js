import React from 'react';
import './style.css';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { IconButton, TextField } from '@material-ui/core';

import { Link } from "react-router-dom";



export class TopNav extends React.Component {

    render() {
        return (
            <div className="top-nav-container">
                <h2>APP name</h2>
                <div className="mid-content">
                    <form noValidate autoComplete="off">
                        <TextField className="search-box" id="standard-basic" placeholder="Search" variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Divider orientation="vertical" />
                                        <IconButton  color="primary" aria-label="directions">
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </form>
                </div>
                <div>
                    <IconButton  color="primary" aria-label="">
                    <Link to="/grid" ><VideoLibraryIcon /></Link>
                        </IconButton>
                    <IconButton  color="primary" aria-label="">
                    <Link to="/settings" ><SettingsIcon /></Link></IconButton>
                </div>
            </div>
        );
    }
}