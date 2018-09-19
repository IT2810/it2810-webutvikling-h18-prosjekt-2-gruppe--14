import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';
import Title from './components/Title';
import Navbar from './components/Navbar';
import Tabs from './components/Tabs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "Title",
      footer: "Footer",
      events: [],
      settings: {
        motive: 1,
        sound: 1,
        text: 1
      }
    };
  }

  //Function that gets passed down to the Navbar - changing motive setting.
  changeMotive = (value) => {
    this.setState({settings: {
        motive: value,
        sound: this.state.settings.sound,
        text: this.state.settings.text
        }
    });
  }

  //Function that gets passed down to the Navbar - changing sound setting.
  changeSound = (value) => {
    this.setState({settings: {
      motive: this.state.settings.motive,
      sound: value,
      text: this.state.settings.text
      }
  });
  }

  //Function that gets passed down to the Navbar - changing text setting.
  changeText = (value) => {
    this.setState({settings: {
      motive: this.state.settings.motive,
      sound: this.state.settings.sound,
      text: value
      }
  });
  }

  //Function rendering the webpage header.
  renderHeader() {
    return (
      <div className="item1">
          <Navbar changeMotive={this.changeMotive} changeSound={this.changeSound} changeText={this.changeText}/>
          <Title title="Header"/>
      </div>
    );
  }

  //Function rendering the art based on user settings.
  renderArt() {
    return (
      <div className="item2">
        <Tabs settings={this.state.settings}/>
      </div>
    );
  }

  //Function rendering the webpage footer.
  renderFooter() {
    return (
      <div className="item3">
        <Title title={this.state.footer}/>
      </div>
    );
  }

  //Function rendering the application. 
  render() {
    return (
      <div className="App">
        <div className="grid-container">
          {this.renderHeader()}
          {this.renderArt()}
          {this.renderFooter()}
        </div>
      </div>
    );
  }
}

export default App;
