import React from 'react';
import ReactPlayer from 'react-player'
const axios = require('axios');


export class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = { res: "", number: 1}
        this.clickNext = this.clickNext.bind(this);
        this.clickBack = this.clickNext.bind(this);
    }

    getData() {
        debugger
        //http://localhost:4000/getData/?number=2 //desarrollo
        axios.get('http://10.0.0.2:4000/getData/?number=2')
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    clickNext(){
        debugger
        this.setState({ number: ++this.state.number });
    }
    clickBack(){
        this.setState({ number: --this.state.number });
    }


    componentWillMount() {
        //this.getData();
        //this.setState({ res: "klk" })
    }

    

    render() {
        return (<div>
            <h1>this is a video</h1>
        <button onClick={this.clickBack} >back </button>
        {this.state.number}
        <button onClick={this.clickNext} >next </button>
        <ReactPlayer url={"http://10.0.0.2:4000/getData/?number="+this.state.number} controls={true} playing />
        </div>);
    }

}



