import React, {Component} from 'react';
import '../style/Art.css';

class Art extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prevMotive: 1,
            prevSound: 1,
            prevText: 1,
            prevVersion: 1,
            firstViewing: true,
            cache: [], // Contains all cached elements
            currentlyInView: { // Contains data about which motive and text that should be shown
                motive: "",
                text: ""
            }

        }
    }

    /**
     * Generates a motive from cache. Loads motive into cache if text not in cache
     * @param motive {Number} (Integer) Motive index in {@link reference}  that should be generated
     * @param version {Number} (Integer) Version that should be generated
     * @returns {Promise<void>}
     */
    async generateMotive(motive, version) {
        const url = "/resources/motive/" + resources.motive[motive][version] + ".svg";
        let cache = this.getCache();

        if (!(url in cache)) // If the URL is not in the cache, add it.
            await this.cacheUrlAndData(url, false);
        cache = this.getCache();
        const data = cache[url]; // Index cache on URL to get cached data

        let currentlyInView = this.getCurrentlyInView();
        currentlyInView["motive"] = data; // Update value of motive that should be viewed

        const element = this.stringToElement(data); // Returns actual HTML element. The "data" constant, cannot be used directly
        this.addElement(element, "motive-container");

        this.setState({currentlyInView: currentlyInView});
    }

    /**
     * Generates a text from cache. Loads text into cache if text not in cache
     * @param text {Number} (Integer) Text index in {@link reference} that should be generated
     * @param version {Number} (Integer) Version that should be generated
     * @returns {Promise<void>}
     */
    async generateText(text, version) {
        const url = "/resources/text/" + resources.text[text] + ".json";
        let cache = this.getCache();

        if (!(url in cache)) // If the URL is not in the cache, add it.
            await this.cacheUrlAndData(url, true); // Text is JSON => bool is true
        cache = this.getCache();
        const data = cache[url]["quotes"][version - 1]; // Index on url, which is a JSON file containing "movies" and "quotes". Index on "quotes" which is 0-indexed

        let currentlyInView = this.getCurrentlyInView();
        currentlyInView["text"] = data; // Update value of text that should be viewed

        const textElement = document.createElement("p");
        textElement.innerHTML = data;
        this.addElement(textElement, "text-container");

        this.setState({currentlyInView: currentlyInView});
    }

    /**
     * Generate a link to an audio file and update the audio player
     * @param audio {Number} (Integer) Audio index in {@link reference} that should be generated
     * @param version {Number} (Integer) Version that should be generated
     */
    generateAudio(audio, version) {
        const url = "/resources/sound/" + resources.sound[audio] + "/" + resources.sound[audio] + version + ".mp3";
        const audioController = document.getElementById("audio-container");

        audioController.pause();
        audioController.src = url;
        audioController.load();
        audioController.play();

        this.setState({prevSound: audio});
    }

    /**
     * Gets data from files and stores it in a cache dictionary
     * @param url {String} URL to file
     * @param json {Boolean} Bool to decide parsing of content in URL
     * @returns {Promise<void>}
     */
    async cacheUrlAndData(url, json) {
        let cache = this.getCache();
        if (!(url in cache)) {
            let cache = this.state.cache;
            cache[url] = "";
            await fetch(url) // Fetch URL -> Parse correctly -> Add it to the cache with the URL as index
                .then(response => json ? response.json() : response.text())
                .then(response => cache[url] = response);

            this.setState({cache: cache});
        }
    }

    /**
     * Function that generates the whole artwork when there is a change
     * @param motive {Number} (Integer) Index of motive
     * @param sound {Number} (Integer) Index of sound
     * @param text {Number} (Integer) Index of text
     * @param version {Number} (Integer) Version of art to be generated
     */
    generateArt(motive, sound, text, version) {
        if (this.state.prevMotive !== motive || this.state.prevVersion !== version) { // Change if version or art piece has changed
            this.generateMotive(motive, version);
            this.setState({prevMotive: motive});
        }

        if (this.state.prevSound !== sound || this.state.prevVersion !== version) {
            this.generateAudio(sound, version);
            this.setState({prevSound: sound})
        }

        if (this.state.prevText !== text || this.state.prevVersion !== version) {
            this.generateText(text, version);
            this.setState({prevText: text});
        }

        if (this.state.prevVersion !== version) {
            this.setState({prevVersion: version});
        }
    };

    /**
     * Returns copy of cache that is mutable
     * @returns {{} & Array}
     */
    getCache() {
        return Object.assign({}, this.state.cache);
    }

    /**
     * Returns copy of 'currentlyInView' that is mutable
     * @returns {({} & Art.state.currentlyInView) | ({} & {motive, text})}
     */
    getCurrentlyInView() {
        return Object.assign({}, this.state.currentlyInView);
    }


    stringToElement(string) {
        let element = document.createElement('div')
        element.innerHTML = string;
        return element;
    }

    /**
     * Insert child element to a given element
     * @param element {HTMLElement} Parent element.
     * @param id {String} ID of parent
     */
    addElement(element, id) {
        let motiveContainer = document.getElementById(id);
        motiveContainer.innerHTML = "";
        motiveContainer.insertAdjacentElement("afterbegin", element);
    }

    // Load art at first viewing
    componentDidMount() {
        this.generateText(1, 1);
        this.generateMotive(1, 1);
        this.generateAudio(1, 1);
    }

    componentDidUpdate() {
        this.generateArt(this.props.settings.motive, this.props.settings.sound, this.props.settings.text, this.props.art);
    }

    render() {
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

// Dict containing all relative paths to resources
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