import React from 'react';
import './style.scss';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton } from '@material-ui/core';
import { SearchBox } from '../SearchBox/SearchBox';
import { Link } from "react-router-dom";

export class MobileNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showSearch: false
        }
    }

    closeSearchBox() {
        this.setState({ showSearch: false });
    }

    toggleSearchBox() {
        this.setState({ showSearch: !this.state.showSearch });
    }

    render() {
        return (
            <>
                {this.state.showSearch? <div className="search-container">
                    <span onClick={this.closeSearchBox.bind(this)} className="close-btn">
                        <HighlightOffIcon />
                    </span>
                    <h4>Write somthing</h4>
                    <SearchBox />
                </div>:<></>}
                <div className="mobile-nav">
                    <IconButton aria-label="">
                        <Link to="/grid" ><HomeIcon /></Link>
                    </IconButton>
                    <IconButton aria-label="" onClick={this.toggleSearchBox.bind(this)}>
                        <SearchIcon /></IconButton>
                    <IconButton aria-label="">
                        <Link to="/settings" ><SettingsIcon /></Link></IconButton>
                </div>
            </>
        );
    }
}