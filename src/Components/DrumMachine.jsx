import React from "react";

//Components
import DisplayBanks from "./DisplayBanks";
import DisplayMessage from "./DisplayMessage";
import DrumPad from "./DrumPad";

//Sound Banks
const ACOUSTIC_BANK = [
  {
    buttonId: "hi-hat",
    audioId: "Q",
    src: "./src/assets/audio/hihat-acoustic01.wav"
  },
  {
    buttonId: "open-hat",
    audioId: "W",
    src: "./src/assets/audio/openhat-acoustic01.wav"
  },
  {
    buttonId: "clap",
    audioId: "E",
    src: "./src/assets/audio/clap-808.wav"
  },
  {
    buttonId: "snare",
    audioId: "A",
    src: "./src/assets/audio/snare-acoustic01.wav"
  },
  {
    buttonId: "tom-tom",
    audioId: "S",
    src: "./src/assets/audio/tom-acoustic01.wav"
  },
  {
    buttonId: "block",
    audioId: "D",
    src: "./src/assets/audio/perc-808.wav"
  },
  {
    buttonId: "kick1",
    audioId: "Z",
    src: "./src/assets/audio/kick-big.wav"
  },
  {
    buttonId: "kick2",
    audioId: "X",
    src: "./src/assets/audio/kick-vinyl02.wav"
  },
  {
    buttonId: "wop",
    audioId: "C",
    src: "./src/assets/audio/perc-tribal.wav"
  }
];
const FUNKY_BANK = [
  {
    buttonId: "electro-hat",
    audioId: "Q",
    src: "./src/assets/audio/hihat-electro.wav"
  },
  {
    buttonId: "slick-hat",
    audioId: "W",
    src: "./src/assets/audio/openhat-slick.wav"
  },
  {
    buttonId: "chirp",
    audioId: "E",
    src: "./src/assets/audio/perc-chirpy.wav"
  },
  {
    buttonId: "80s-snare",
    audioId: "A",
    src: "./src/assets/audio/snare-808.wav"
  },
  {
    buttonId: "80s-tom",
    audioId: "S",
    src: "./src/assets/audio/tom-808.wav"
  },
  {
    buttonId: "sumo",
    audioId: "D",
    src: "./src/assets/audio/snare-sumo.wav"
  },
  {
    buttonId: "tron-kick",
    audioId: "Z",
    src: "./src/assets/audio/kick-tron.wav"
  },
  {
    buttonId: "zapper-kick",
    audioId: "X",
    src: "./src/assets/audio/kick-zapper.wav"
  },
  {
    buttonId: "zip",
    audioId: "C",
    src: "./src/assets/audio/perc-nasty.wav"
  }
];

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBank: "funky",
      soundBank: FUNKY_BANK,
      currentSound: ""
    };

    this.animateButton = this.animateButton.bind(this);
    this.animateText = this.animateText.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleBankChange = this.handleBankChange.bind(this);
  }
  componentDidMount() {
    this.changeTheme();
  }
  animateButton(button) {
    if (!button.classList.contains("pulse")) {
      button.classList.add("pulse");
      button.addEventListener("transitionend", function removeAnimation() {
        button.classList.remove("pulse");
        button.removeEventListener("transitionend", removeAnimation);
      });
    } else {
      button.classList.remove("pulse");
    }
  }
  animateText() {
    let displayText = document.getElementById("display");

    if (!displayText.classList.contains("fadeText")) {
      displayText.classList.add("fadeText");
      displayText.addEventListener("transitionend", function removeAnimation() {
        displayText.classList.remove("fadeText");
        displayText.removeEventListener("transitionend", removeAnimation);
      });
    } else {
      displayText.classList.remove("fadeText");
    }
  }
  changeTheme(newBank) {
    let arr = FUNKY_BANK;

    if (newBank === "funky") {
      arr = ACOUSTIC_BANK;
    }

    for (let i = 0; i < arr.length; i++) {
      let cn = "rainbow" + i;
      let id = arr[i].buttonId;
      document.getElementById(id).classList.toggle(cn);
    }
  }
  handleInput(soundObj) {
    let audio = soundObj.firstChild;

    audio.load();
    audio.play();

    this.animateButton(soundObj);
    this.animateText();
    this.setState({
      currentSound: soundObj.id
    });
  }
  handleBankChange(bank) {
    let newBank = ACOUSTIC_BANK;

    if (bank === "funky") {
      newBank = FUNKY_BANK;
    }
    this.setState({
      selectedBank: bank,
      soundBank: newBank
    });
    this.changeTheme(bank);
  }
  render() {
    return (
      <div className="bg-container">
        <div id="drum-machine" className="grid">
          <div className="grid-cell">
            <h1>Good Beats</h1>
          </div>
          <div className="grid-cell">
            <DisplayBanks
              onBankChange={this.handleBankChange}
              selectedBank={this.state.selectedBank}
            />
          </div>
          <div className="grid-cell">
            <DrumPad
              soundBank={this.state.soundBank}
              onInput={this.handleInput}
            />
          </div>
          <div className="grid-cell">
            <DisplayMessage message={this.state.currentSound} />
          </div>
        </div>
      </div>
    );
  }
}

export default DrumMachine;
