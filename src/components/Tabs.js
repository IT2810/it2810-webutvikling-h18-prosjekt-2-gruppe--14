import React, {Component} from 'react';
import './../style/Tabs.css';

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
                    <button className={this.state.art === 1 ? "tabactive" : "tab"} onClick={e => {
                        this.setState({art: 1});
                        this.props.changeVersion(1);
                    }}>1
                    </button>
                    <button className={this.state.art === 2 ? "tabactive" : "tab"} onClick={e => {
                        this.setState({art: 2});
                        this.props.changeVersion(2);
                    }}>2
                    </button>
                    <button className={this.state.art === 3 ? "tabactive" : "tab"} onClick={e => {
                        this.setState({art: 3});
                        this.props.changeVersion(3);
                    }}>3
                    </button>
                    <button className={this.state.art === 4 ? "tabactive" : "tab"} onClick={e => {
                        this.setState({art: 4});
                        this.props.changeVersion(4);
                    }}>4
                    </button>
                </div>
            </div>
        );
    }
}

export default Tabs;