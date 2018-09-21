import React, {Component} from 'react';
import './../style/Tabs.css';
import Art from "./Art";

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            art: 1,
        };
    }

    render() {
        // The settings are available in this.props.settings
        return (
            <div>
                <div className="tab-container">
                    <button className={this.state.art == 1 ? "tabactive" : "tab"} onClick={e => {
                        this.setState({art: 1});
                    }}>1
                    </button>
                    <button className={this.state.art == 2 ? "tabactive" : "tab"} onClick={e => {
                        this.setState({art: 2});
                    }}>2
                    </button>
                    <button className={this.state.art == 3 ? "tabactive" : "tab"} onClick={e => {
                        this.setState({art: 3});
                    }}>3
                    </button>
                    <button className={this.state.art == 4 ? "tabactive" : "tab"} onClick={e => {
                        this.setState({art: 4});
                    }}>4
                    </button>
                </div>
                <div>
                    <Art
                        settings={this.props.settings}
                        art={this.state.art}
                    ></Art>
                </div>
            </div>
        );
    }
}

export default Tabs;