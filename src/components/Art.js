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
            fetch("/resources/text/"+resources.text[text]+".json")
                .then(res => res.json())
                .then(json => {
                    document.getElementById("text-container").innerText = json["quotes"][version-1];
                });
            this.setState({prev_text: text});

        }

        if (this.state.prev_version !== version) {
            this.setState({prev_version: version});
        }
    };


    render() {
        this.generateArt(this.props.settings.motive, this.props.settings.sound, this.props.settings.text, this.props.settings.version);
        return null;
    }
}

const resources = {
    text: {
        1:"lotr",
        2:"inception",
        3:"starwars"
    },
    motive: {
        1: {
            1: "vehicle/ambulance",
            2: "vehicle/bus",
            3: "vehicle/car",
            4: "vehicle/plane"
        },
        2: {
            1: "nature/beach",
            2: "nature/forest",
            3: "nature/grassland",
            4: "nature/river"
        },
        3: {
            1: "animal/cat",
            2: "animal/crab",
            3: "animal/dog",
            4: "animal/owl"
        },
    },
    sound: {
        1: "electronic",
        2: "rock",
        3: "jazz"
    }
};


export default Art;