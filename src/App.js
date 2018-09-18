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
    };
  }

  //Function rendering the webpage header.
  renderHeader() {
    return (
      <div class="item1">
        <Title title={this.state.header}/>
      </div>
    );
  }

  //Function rendering the art based on user settings.
  renderArt() {
    return (
      <div className="item2">
        <Title title={"Art"}/>
        <Tabs/>
      </div>
    );
  }

  //Function rendering the webpage footer.
  renderFooter() {
    return (
      <div className="item3">
        <Title title={this.state.footer}/>
        <Navbar/>
      </div>
    );
  }

  //Function rendering the application. 
  render() {
    return (
      <div className="App">
        <div class="grid-container">
          {this.renderHeader()}
          {this.renderArt()}
          {this.renderFooter()}
        </div>
      </div>
    );
  }
}

export default App;
