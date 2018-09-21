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
            isLoaded: false,
            cache: [],
            currently_in_view: {
                motive: "",
                text: ""
            }
            
        }
    }

    async generateMotive(motive, version) {
        const url = "/resources/motive/" + resources.motive[motive][version] + ".svg";
        if (!(url in this.getCache()))
            await this.getDataAndCache(url, false);
        const data = this.getCache()[url];

        let currently_in_view = this.getCurrentlyInView();
        currently_in_view["motive"] = data;
        const element = this.stringToElement(data)
        this.addElement(element, "motive-container");
        
        this.setState({currently_in_view: currently_in_view});
    }

    async generateText(text, version) {
        const url = "/resources/text/" + resources.text[text] + ".json";
        if (!(url in this.getCache()))
            await this.getDataAndCache(url, true);

        const retrieved_text = this.getCache()[url]["quotes"][version - 1];
        const currently_in_view = this.getCurrentlyInView();
        currently_in_view["text"] = retrieved_text;

        text = document.createElement("p");
        text.innerHTML = retrieved_text;
        this.addElement(text, "text-container");

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
        let cache = this.getCache();
        if (!(url in cache)) {
            console.log("Adding url: '" + url + "' to cache")
            let cache = this.state.cache;
            cache[url] = "";
            await fetch(url)
                .then(response => json ? response.json() : response.text())
                .then(response => cache[url] = response);
            this.setState({cache: cache});
        }
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

    getCache() {
        return Object.assign({}, this.state.cache);
    }

    getCurrentlyInView() {
        return Object.assign({}, this.state.currently_in_view);
    }

    stringToElement(string) {
        let element = document.createElement('div')
        element.innerHTML = string;
        return element;
    }

    addElement(element, id) {
        let motiveContainer = document.getElementById(id);
        motiveContainer.innerHTML = "";
        motiveContainer.insertAdjacentElement("afterbegin", element);
    }


    componentDidMount() {
        if (!this.state.isLoaded) {
            this.setState({isLoaded: true});
            this.generateText(1,1);
            this.generateMotive(1,1);
            this.generateAudio(1,1);
        }
    }
    
    render() {
        this.generateArt(this.props.settings.motive, this.props.settings.sound, this.props.settings.text, this.props.art);
        return (
            <div className="artcontainer">
                <div id={"motive-container"} className="motive">
                </div>
                <div id="text-container" className="text">
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