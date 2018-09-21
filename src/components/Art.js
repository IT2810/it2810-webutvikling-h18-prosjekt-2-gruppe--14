import React, {Component} from 'react';
import '../style/Art.css';

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
            cache: [],
            currently_in_view: {
                motive: "",
                text: ""
            }
        }
    }

    async generateMotive(motive, version) {
        const url = "/resources/motive/"+resources.motive[motive][version]+".svg";
        const data = await this.getDataAndCache(url, false);
        // const data = this.props.cache[url];

        console.log(data);
        let currently_in_view = Object.assign({}, this.state.currently_in_view);
        currently_in_view["motive"] = data;
        this.setState({currently_in_view: currently_in_view});
    }

    async generateText(text, version) {
        const url = "/resources/text/" + resources.text[text] + ".json";
        await this.getDataAndCache(url, true);
        const retrieved_text = this.state.cache[url]["quotes"][version - 1];
        
        let currently_in_view = Object.assign({}, this.state.currently_in_view);
        currently_in_view["text"] = retrieved_text;
        this.setState({currently_in_view: currently_in_view});
    }

    generateAudio(audio, version) {
        const url = "/resources/sound/" + resources.sound[audio] + "/" + resources.sound[audio] + version + ".mp3";
        const audio_controller = document.getElementById("audio-container");

        audio_controller.pause();
        audio_controller.src = url;
        audio_controller.load();
        audio_controller.play();

        this.setState({prev_sound: audio});
    }

    async getDataAndCache(url, json) {
        let cache = Object.assign({}, this.state.cache);
        if (!(url in cache)) {
            console.log("Adding url: '"+url+"' to cache")
            let cache = this.state.cache;
            cache[url] = "";
            this.setState({cache: cache});
            await fetch(url)
                .then(response => json ? response.json() : response.text())
                .then(response => cache[url] = response);
            this.setState({cache: cache});
        }
        return this.state.cache[url];
    }

    generateArt(motive, sound, text, version) {
        if (this.state.prev_motive !== motive || this.state.prev_version !== version) {
            this.setState({prev_motive: motive});
            this.generateMotive(motive, version);
        }

        if (this.state.prev_sound !== sound || this.state.prev_version !== version) {
            this.generateAudio(sound, version);
            this.setState({prev_sound: sound})
        }

        if (this.state.prev_text !== text || this.state.prev_version !== version) {
            this.generateText(text, version);
            this.setState({prev_text: text});
        }

        if (this.state.prev_version !== version) {
            this.setState({prev_version: version});
        }
    };

    componentDidMount() {

    }

    render() {
        this.generateArt(this.props.settings.motive, this.props.settings.sound, this.props.settings.text, this.props.art);
        return (
            <div className="artcontainer">
                <div id={"motive-container"} className="motive">
                    {this.state.currently_in_view["motive"]}
                </div>
                <div id="text-container" className="text">
                    <p>{this.state.currently_in_view["text"]}</p>
                </div>
                <div className="audio">
                    <audio id={"audio-container"} type="audio/mpeg"></audio>
                </div>
            </div>
        );
    }
}

const resources = {
    text: {
        1: "lotr",
        2: "inception",
        3: "starwars"
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