import React from 'react';
import './style.scss';
import SettingsIcon from '@material-ui/icons/Settings';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import { IconButton} from '@material-ui/core';
import { SearchBox } from '../SearchBox/SearchBox';
import  ct  from '../../helpers/constants'

import { Link } from "react-router-dom";



export class TopNav extends React.Component {

    render() {
        return (
            <div className="top-nav-container">
                <h2>{ct.APP_NAME}</h2>
                <div className="mid-content">
                    <SearchBox />
                </div>
                <div>
                    <IconButton color="primary" aria-label="">
                        <Link to="/grid" ><VideoLibraryIcon /></Link>
                    </IconButton>
                    <IconButton color="primary" aria-label="">
                        <Link to="/settings" ><SettingsIcon /></Link></IconButton>
                </div>
            </div>
        );
    }
}