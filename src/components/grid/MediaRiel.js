import React from 'react';
import './grid.css'
import { GridItem } from './GridItem';

export class MediaRiel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            rowNum: 1,
            nsfw: false,
            selectedCardId: "",
            elements: [],
            tabIndex: -1
        };

        this.selectCard = this.selectCard.bind(this);
        this.refCallBack = this.refCallBack.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.resetList = this.resetList.bind(this);
    }


    componentDidMount() {

    }


    selectCard(ref) {
        let elements = this.state.elements;
        let tabIndex = this.state.tabIndex;
        elements[tabIndex].myRef.current.focus();
        this.state.tabIndex += 1;
    }

    moveRight(ref) {
        
        let elements = this.state.elements;
        console.log(elements)
        let tabIndex = this.state.tabIndex;
        if (tabIndex < elements.length - 1) {
        let nextElement = elements.findIndex((el,i)=>i>this.state.tabIndex && !el.hide()); 
        this.state.tabIndex = nextElement>0?nextElement:tabIndex;
        }
        if (this.state.tabIndex >= 0 && this.state.tabIndex <= elements.length - 1) {
            elements[this.state.tabIndex].myRef.current.focus();
            this.props.openMedia(elements[this.state.tabIndex].props, false);
        }
    }

    moveLeft(ref) {

        let elements = this.state.elements;
        let tabIndex = this.state.tabIndex;
        if (tabIndex > 0){
            let lastIndex = elements.length-1;
            let copyRevertedArray = elements.slice().reverse();
            let nextElement = copyRevertedArray.findIndex((el,i)=>i>(lastIndex-this.state.tabIndex) && !el.hide());
            this.state.tabIndex =  nextElement>0?lastIndex-nextElement:tabIndex;
        }
        if (this.state.tabIndex  >= 0 && this.state.tabIndex  <= elements.length - 1) {
            elements[this.state.tabIndex].myRef.current.focus();
            this.props.openMedia(elements[this.state.tabIndex].props, false);
        }

    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.props.openMedia();
        }
    }


    refCallBack(el) {

        if (el) {
            let elements = this.state.elements;
            el.hide = ()=>!this.props.nsfwMode && el.props.fileData.nsfw;
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
                        <button onClick={this.moveLeft}  > back</button>
                        <button onClick={this.moveRight}  > next</button>
                    </div>
                    <div className="grid-container" >
                        {this.props.media.map((el, i) => (<><GridItem
                        className={(!this.props.nsfwMode && el.nsfw? "hide":"") }
                            ref={this.refCallBack}
                            tabIndex={i}
                            key={el.hashId.toString()}
                            callback={this.props.openMedia}
                            hashId={el.hashId}
                            fileData={el}
                            img={el.tumbnail}
                            title={el.name}
                        />
                        </>))}
                    </div>
                </div>
        );
    }
}