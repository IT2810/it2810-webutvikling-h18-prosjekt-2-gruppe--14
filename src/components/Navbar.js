import React, { Component } from 'react';
import './../style/Navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: true,
            motive: 1,
            sound: 1,
            text: 1
        }
    }

    //Function opening the navbar.
    openNav() {
        document.getElementById("mySidebar").style.width = "25%";
        document.getElementById("main").style.marginLeft = "100%";
    }

    //Function closing the navbar.
    closeNav() {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
    }

    //Function rendering the navbar and listening for changes in settings. The settings are controlled by the components state. 
    render() {
        return (
            <div id="main">{this.state.hide ? <button className={"openbtn"} onClick={ e => {
                this.openNav();
                e.preventDefault();
                this.setState({hide: false})}}>
               {this.state.hide ? "☰" : ""} 
            </button> : ""}
                
                <div id="mySidebar" className="sidebar">
                    <a  className="closebtn" onClick={e => {
                    this.closeNav();
                    e.preventDefault();
                    this.setState({hide: true})}}>x</a>

                    <a >MOTIVE</a>
                        <div style={this.state.motive === 1 ? {color: "#f1f1f1"}: {}} onClick={e => {
                            e.preventDefault();
                            this.setState({motive: 1});
                        }}>{themes.motive[1]}</div>
                        <div style={this.state.motive === 2 ? {color: "#f1f1f1"}: {}} onClick={e => {
                            e.preventDefault();
                            this.setState({motive: 2});
                        }}>{themes.motive[2]}</div>
                        <div style={this.state.motive === 3 ? {color: "#f1f1f1"}: {}} onClick={e => {
                            e.preventDefault();
                            this.setState({motive: 3});
                        }}>{themes.motive[3]}</div>


                    <a >SOUND</a>
                    <div style={this.state.sound === 1 ? {color: "#f1f1f1"}: {}} onClick={e => {
                            e.preventDefault();
                            this.setState({sound: 1});
                        }}>{themes.sound[1]}</div>
                        <div style={this.state.sound === 2 ? {color: "#f1f1f1"}: {}} onClick={e => {
                            e.preventDefault();
                            this.setState({sound: 2});
                        }}>{themes.sound[2]}</div>
                        <div style={this.state.sound === 3 ? {color: "#f1f1f1"}: {}} onClick={e => {
                            e.preventDefault();
                            this.setState({sound: 3});
                        }}>{themes.sound[3]}</div>


                    <a >TEXT</a>
                    <div style={this.state.text === 1 ? {color: "#f1f1f1"}: {}} onClick={e => {
                            e.preventDefault();
                            this.setState({text: 1});
                        }}>{themes.text[1]}</div>
                        <div style={this.state.text === 2 ? {color: "#f1f1f1"}: {}} onClick={e => {
                            e.preventDefault();
                            this.setState({text: 2});
                        }}>{themes.text[2]}</div>
                        <div style={this.state.text === 3 ? {color: "#f1f1f1"}: {}} onClick={e => {
                            e.preventDefault();
                            this.setState({text: 3});
                        }}>{themes.text[3]}</div>

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