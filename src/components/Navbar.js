import React, {Component} from 'react';
import './../style/Navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: true,
            motive: 1,
            sound: 1,
            text: 1
        };
    }

    /**
     * Function opening and closing the navbar by changing width.
     */
    handleNav() {
        if (this.state.hide) {
            document.getElementById("mySidebar").style.width = "50vmax";
        } else {
            document.getElementById("mySidebar").style.width = "12vmax";
        }
    }

    componentDidMount() {
        document.getElementById("mySidebar").style.width = "12vmax"; // Makes the navbar visible.
    }

    //Function rendering the navbar and listening for changes in settings. 
    //The settings are controlled by the components state. The settings are also passed upwards to App.js by calling functions recieved through props from App.js. 
    render() {
        return (
            <div id="main">
                <div id="mySidebar" className="sidebar">
                    <nav className={"container"}
                         onClick={e => {
                             this.handleNav();
                             e.preventDefault();
                             this.setState({hide: !this.state.hide})
                         }}
                    >
                        <nav class={!this.state.hide ? "bar1change" : "bar1"}></nav>
                        <nav class={!this.state.hide ? "bar2change" : "bar2"}></nav>
                        <nav class={!this.state.hide ? "bar3change" : "bar3"}></nav>
                    </nav>

                    {!this.state.hide ? <div>

                        <a>MOTIVE</a>
                        <div style={this.state.motive === 1 ? {color: "#f1f1f1"} : {}} onClick={e => {
                            e.preventDefault();
                            this.setState({motive: 1});
                            this.props.changeMotive(1);
                        }}>{themes.motive[1]}</div>
                        <div style={this.state.motive === 2 ? {color: "#f1f1f1"} : {}} onClick={e => {
                            e.preventDefault();
                            this.setState({motive: 2});
                            this.props.changeMotive(2);
                        }}>{themes.motive[2]}</div>
                        <div style={this.state.motive === 3 ? {color: "#f1f1f1"} : {}} onClick={e => {
                            e.preventDefault();
                            this.setState({motive: 3});
                            this.props.changeMotive(3);
                        }}>{themes.motive[3]}</div>


                        <a>SOUND</a>
                        <div style={this.state.sound === 1 ? {color: "#f1f1f1"} : {}} onClick={e => {
                            e.preventDefault();
                            this.setState({sound: 1});
                            this.props.changeSound(1);
                        }}>{themes.sound[1]}</div>
                        <div style={this.state.sound === 2 ? {color: "#f1f1f1"} : {}} onClick={e => {
                            e.preventDefault();
                            this.setState({sound: 2});
                            this.props.changeSound(2);
                        }}>{themes.sound[2]}</div>
                        <div style={this.state.sound === 3 ? {color: "#f1f1f1"} : {}} onClick={e => {
                            e.preventDefault();
                            this.setState({sound: 3});
                            this.props.changeSound(3);
                        }}>{themes.sound[3]}</div>


                        <a>TEXT</a>
                        <div style={this.state.text === 1 ? {color: "#f1f1f1"} : {}} onClick={e => {
                            e.preventDefault();
                            this.setState({text: 1});
                            this.props.changeText(1);
                        }}>{themes.text[1]}</div>
                        <div style={this.state.text === 2 ? {color: "#f1f1f1"} : {}} onClick={e => {
                            e.preventDefault();
                            this.setState({text: 2});
                            this.props.changeText(2);
                        }}>{themes.text[2]}</div>
                        <div style={this.state.text === 3 ? {color: "#f1f1f1"} : {}} onClick={e => {
                            e.preventDefault();
                            this.setState({text: 3});
                            this.props.changeText(3);
                        }}>{themes.text[3]}</div>
                    </div> : ""}

                </div>
            </div>
        );
    }
}

//Setting options. To edit or add settings - insert here:
const themes = {
    text: {
        1: "The Lord of the Rings",
        2: "Inception",
        3: "Star Wars",
    },
    motive: {
        1: "Vehicles",
        2: "Nature",
        3: "Animals",
    },
    sound: {
        1: "Electronic",
        2: "Rock",
        3: "Jazz",
    }

};

export default Navbar;