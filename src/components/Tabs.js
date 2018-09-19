import React, { Component } from 'react';
import './../style/Tabs.css';
import Art from "./Art";

class Tabs extends Component {
    render() {
        //Innstillingene er tilgjengelig i this.props.settings. De består av tall 1 til 3 i de tre kategoriene, motive, sound og text.
        console.log(this.props.settings);
        return (

            <div>
                <div className="tab-container">
                    <button className="tab" onClick={e => {this.openTab(e, 'art-1')}}>1</button>
                    <button className="tab" onClick={e => {this.openTab(e, 'art-2')}}>2</button>
                    <button className="tab" onClick={e => {this.openTab(e, 'art-3')}}>3</button>
                    <button className="tab" onClick={e => {this.openTab(e, 'art-4')}}>4</button>
                </div>

                <div id="art-1" className="tab-content">
                    <p>Enjoy the art 1</p>
                    <Art
                        motive={this.props.settings.motive}
                        sound={this.props.settings.sound}
                        text={this.props.settings.text}
                        version={1}>
                    </Art>
                </div>

                <div id="art-2" className="tab-content">
                    <p>Enjoy the art 2</p>
                    <Art
                        motive={this.props.settings.motive}
                        sound={this.props.settings.sound}
                        text={this.props.settings.text}
                        version={2}>
                    </Art>
                </div>

                <div id="art-3" className="tab-content">
                    <p>Enjoy the art 3</p>
                    <Art
                        motive={this.props.settings.motive}
                        sound={this.props.settings.sound}
                        text={this.props.settings.text}
                        version={3}>
                    </Art>
                </div>

                <div id="art-4" className="tab-content">
                    <p>Enjoy the art 4</p>
                    <Art
                        motive={this.props.settings.motive}
                        sound={this.props.settings.sound}
                        text={this.props.settings.text}
                        version={4}>
                    </Art>
                </div>
            </div>
        );
    }

    openTab(e, selectedElement) {
        let elements = document.getElementsByClassName("tab-content");
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = "none";
        }
        let tabs = document.getElementsByClassName("tab");
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].className = tabs[i].className.replace(" active", "");
        }
        document.getElementById(selectedElement).style.display = "block";
        e.currentTarget.className += " active";
    }
}

export default Tabs;
