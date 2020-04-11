import React from 'react';
import './grid.css'
import { GridItem } from './GridItem';
import { Button } from '@material-ui/core/';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export class MediaRiel extends React.Component {

    constructor(props) {
        super(props);
        this.BASE_NUM_ELMENT_ROW = 7;
        this.state = {
            modal: false,
            rowNum: 1,
            nsfw: false,
            selectedCardId: "",
            elements: [],
            tabIndex: -1,
            media: []
        };

        this.selectCard = this.selectCard.bind(this);
        this.refCallBack = this.refCallBack.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.resetList = this.resetList.bind(this);
        this.pushMediaElement = this.pushMediaElement.bind(this);
    }


    componentDidMount() {
        let lastIndex = 0;// this.BASE_NUM_ELMENT_ROW;
        let lementToBeDisplayed =0;
        this.props.media.forEach((p,i)=>{
            if(!p.nsfw &&  lementToBeDisplayed<this.BASE_NUM_ELMENT_ROW){
                lementToBeDisplayed++;
                lastIndex=i+1;
            }
           // if(this.BASE_NUM_ELMENT_ROW==lementToBeDisplayed)lastIndex=i+1;
        })
        lastIndex =  lastIndex> this.BASE_NUM_ELMENT_ROW?lastIndex:this.BASE_NUM_ELMENT_ROW;
        this.setState({ media: this.props.media.slice(0, lastIndex) });
    }

    selectCard(ref) {
        let elements = this.state.elements;
        let tabIndex = this.state.tabIndex;
        elements[tabIndex].myRef.current.focus();
        this.state.tabIndex += 1;
    }

    moveRight(ref) {
        let elements = this.state.elements;
        console.log(elements);
        console.log("tabindex: ", this.state.tabIndex);
        let tabIndex = this.state.tabIndex;
        if(tabIndex == elements.length - 2)  this.pushMediaElement();
        if (tabIndex < elements.length - 1) {
            let nextElement = elements.findIndex((el, i) => i > this.state.tabIndex && !el.isHide());
            console.log("nextEl ", nextElement)
            this.state.tabIndex = nextElement >= 0 ? nextElement : tabIndex;
        }
        if (this.state.tabIndex >= 0 && this.state.tabIndex <= elements.length - 1) {
            elements[this.state.tabIndex].myRef.current.focus();
            this.props.openMedia(elements[this.state.tabIndex].props, false);
        }
    }

    moveLeft(ref) {
        let elements = this.state.elements;
        let tabIndex = this.state.tabIndex;
        if (tabIndex > 0) {
            let lastIndex = elements.length - 1;
            let copyRevertedArray = elements.slice().reverse();
            let nextElement = copyRevertedArray.findIndex((el, i) => i > (lastIndex - this.state.tabIndex) && !el.isHide());
            this.state.tabIndex = nextElement > 0 ? lastIndex - nextElement : tabIndex;
        }
        if (this.state.tabIndex >= 0 && this.state.tabIndex <= elements.length - 1) {
            elements[this.state.tabIndex].myRef.current.focus();
            this.props.openMedia(elements[this.state.tabIndex].props, false);
        }

    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.props.openMedia();
        }
    }

    pushMediaElement(num =1) {
        num = num >0?num:1;
        var media = this.state.media;
        if (media.length < this.props.media.length) {
            media = [...media, ...this.props.media.slice(media.length, (media.length+num))];
            this.setState({ media });
        }
    }


    refCallBack(el) {

        if (el) {
            let elements = this.state.elements;
            //el.hide = () => !this.props.nsfwMode && el.props.fileData.nsfw;
            elements.push(el)
            this.setState({ elements });
        }
    }

    resetList(index) {

    }

    render() {
        return (
            <div className="repoContainer">
                <div className="carrusel-top-bar">
                    <h2 >{this.props.repoName}</h2>
                </div>
                <div className="btn-nav">
                    <Button onClick={this.moveLeft} className="btn-nav-style" ><ArrowBackIosIcon />Move Left</Button>
                    <Button onClick={this.moveRight} className="btn-nav-style" >Move Right<ArrowForwardIosIcon /></Button>

                </div>
                <div className="grid-container" >
                    {this.state.media.length > 0 ? this.state.media.map((el, i) => (<GridItem
                        className={(!this.props.nsfwMode && el.nsfw ? "hide" : "")}
                        ref={this.refCallBack}
                        nsfwMode={this.props.nsfwMode}
                        tabIndex={i}
                        key={el.hashId}
                        callback={this.props.openMedia}
                        hashId={el.hashId}
                        fileData={el}
                        img={el.tumbnail}
                        title={el.name}
                    />)) :
                        <h5>There is nothing here.</h5>}
                </div>
            </div>
        );
    }
}