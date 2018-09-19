import React, {Component} from 'react';

class Art extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prev_motive: 1,
            prev_sound: 1,
            prev_text: 1,
            prev_version: 1,
        }
    }

    render() {
        console.log(resources[1]);
        return (
            <div>
                <h1>Motive: {this.props.motive}</h1>
                <h1>Sound: {this.props.sound}</h1>
                <h1>Text: {this.props.text}</h1>
                <h1>Version: {this.props.version}</h1>
            </div>
        )
    }
}

function generateArt(motive, sound, text, version) {
}

const resources = {
    text: {
        1:"inception",
        2:"lotr",
        3:"starwars"
    },
    motive: {
        "vehicle": {
            1: "ambulance",
            2: "bus",
            3: "car",
            4: "plane"
        },
        "nature": {
            1: "beach",
            2: "forest",
            3: "grassland",
            4: "river"
        },
        "animal": {
            1: "cat",
            2: "crab",
            3: "dog",
            4: "owl"
        },
    },
    sound: {
        1: "electronic",
        2: "rock",
        3: "jazz"
    }
};


export default Art;