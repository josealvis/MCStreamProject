import React from 'react';
//https://github.com/zpao/qrcode.react
import QRCode from "qrcode.react";
import axios from 'axios';

import './style.scss';
import SettingsIcon from '@material-ui/icons/Settings';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import { IconButton } from '@material-ui/core';
import { SearchBox } from '../SearchBox/SearchBox';
import ct from '../../helpers/constants'

import { Link } from "react-router-dom";

export class TopNav extends React.Component {

    constructor(props) {
        super(props)
        this.state = { localHost: "" }
    }

    componentDidMount() {
        let scope = this;
        axios.get('/getLocalHost')
            .then(function (response) {
                console.log(response);
                scope.setState({ localHost: response.data })
            });
    }
    render() {
        return (
            <div className="top-nav-container">
                <h2>{ct.APP_NAME}</h2>
                <div className="mid-content">
                    <SearchBox />
                </div>
                <div className="action-btn">
                    <IconButton color="primary" aria-label="">
                        <Link to="/grid" ><VideoLibraryIcon /></Link>
                    </IconButton>
                    <IconButton color="primary" aria-label="">
                        <Link to="/settings" ><SettingsIcon /></Link></IconButton>

                    <div className="qr-container">
                        <QRCode level="Q" value={"http://" + this.state.localHost}
                            size='60'
                        />
                    </div>
                </div>

            </div>
        );
    }
}