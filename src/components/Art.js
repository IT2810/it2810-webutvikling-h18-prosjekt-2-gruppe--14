import React, {Component} from 'react';

class Art extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prev_motive: 1,
            prev_sound: 1,
            prev_text: 1,
            prev_version: 1,
            source_motive: "",
            source_audio: "",
            source_text: "",

        }
    }

    generateArt(motive, sound, text, version) {
        if (this.state.prev_motive !== motive || this.state.prev_version !== version) {
            const artContainer = document.getElementById("motive-container");
            artContainer.innerHTML = "";
            const path = "/resources/motive/"+resources.motive[motive][version]+".svg";

            fetch(path)
                .then(response => response.text())
                .then(svg => artContainer.insertAdjacentHTML("afterbegin", svg));
            this.setState({prev_motive: motive});
        }

        if (this.state.prev_sound !== sound || this.state.prev_version !== version) {
            const path = "/resources/sound/"+resources.sound[sound]+"/"+resources.sound[sound]+version+".mp3";
            const audio = document.getElementById("audio-container");

            audio.pause();
            audio.src = path;
            audio.load();
            audio.play();
            this.setState({prev_sound: sound});
        }

        if (this.state.prev_text !== text || this.state.prev_version !== version) {
            const data = await fetch("/resources/text/"+resources.text[text]+".json")
                .then(res => res.json());
            document.getElementById("text-container").innerText = data["quotes"][version-1];
        }

        if (this.state.prev_version !== version) {
            this.setState({prev_version: version});
        }
    };
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