// Libraries
import React from 'react';

// Components
import DisplayBanks from './DisplayBanks';
import DisplayMessage from './DisplayMessage';
import DrumPad from './DrumPad';

// Audio files
import acoustic1 from '/audio/hihat-acoustic01.wav';
import acoustic2 from '/audio/openhat-acoustic01.wav';
import acoustic3 from '/audio/clap-808.wav';
import acoustic4 from '/audio/snare-acoustic01.wav';
import acoustic5 from '/audio/tom-acoustic01.wav';
import acoustic6 from '/audio/perc-808.wav';
import acoustic7 from '/audio/kick-big.wav';
import acoustic8 from '/audio/kick-vinyl02.wav';
import acoustic9 from '/audio/perc-tribal.wav';
import funk1 from '/audio/hihat-electro.wav';
import funk2 from '/audio/openhat-slick.wav';
import funk3 from '/audio/perc-chirpy.wav';
import funk4 from '/audio/snare-808.wav';
import funk5 from '/audio/tom-808.wav';
import funk6 from '/audio/snare-sumo.wav';
import funk7 from '/audio/kick-tron.wav';
import funk8 from '/audio/kick-zapper.wav';
import funk9 from '/audio/perc-nasty.wav';

//Sound Banks
const ACOUSTIC_BANK = [
	{
		buttonId: 'hi-hat',
		audioId: 'Q',
		src: acoustic1
	},
	{
		buttonId: 'open-hat',
		audioId: 'W',
		src: acoustic2
	},
	{
		buttonId: 'clap',
		audioId: 'E',
		src: acoustic3
	},
	{
		buttonId: 'snare',
		audioId: 'A',
		src: acoustic4
	},
	{
		buttonId: 'tom-tom',
		audioId: 'S',
		src: acoustic5
	},
	{
		buttonId: 'block',
		audioId: 'D',
		src: acoustic6
	},
	{
		buttonId: 'kick1',
		audioId: 'Z',
		src: acoustic7
	},
	{
		buttonId: 'kick2',
		audioId: 'X',
		src: acoustic8
	},
	{
		buttonId: 'wop',
		audioId: 'C',
		src: acoustic9
	}
];
const FUNKY_BANK = [
	{
		buttonId: 'electro-hat',
		audioId: 'Q',
		src: funk1
	},
	{
		buttonId: 'slick-hat',
		audioId: 'W',
		src: funk2
	},
	{
		buttonId: 'chirp',
		audioId: 'E',
		src: funk3
	},
	{
		buttonId: '80s-snare',
		audioId: 'A',
		src: funk4
	},
	{
		buttonId: '80s-tom',
		audioId: 'S',
		src: funk5
	},
	{
		buttonId: 'sumo',
		audioId: 'D',
		src: funk6
	},
	{
		buttonId: 'tron-kick',
		audioId: 'Z',
		src: funk7
	},
	{
		buttonId: 'zapper-kick',
		audioId: 'X',
		src: funk8
	},
	{
		buttonId: 'zip',
		audioId: 'C',
		src: funk9
	}
];

class DrumMachine extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedBank: 'funky',
			soundBank: FUNKY_BANK,
			currentSound: ''
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
		if (!button.classList.contains('pulse')) {
			button.classList.add('pulse');
			button.addEventListener('transitionend', function removeAnimation() {
				button.classList.remove('pulse');
				button.removeEventListener('transitionend', removeAnimation);
			});
		} else {
			button.classList.remove('pulse');
		}
	}
	animateText() {
		let displayText = document.getElementById('display');

		if (!displayText.classList.contains('fadeText')) {
			displayText.classList.add('fadeText');
			displayText.addEventListener('transitionend', function removeAnimation() {
				displayText.classList.remove('fadeText');
				displayText.removeEventListener('transitionend', removeAnimation);
			});
		} else {
			displayText.classList.remove('fadeText');
		}
	}
	changeTheme(newBank) {
		let arr = FUNKY_BANK;

		if (newBank === 'funky') {
			arr = ACOUSTIC_BANK;
		}

		for (let i = 0; i < arr.length; i++) {
			let cn = 'rainbow' + i;
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

		if (bank === 'funky') {
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
			<div className="aspect-ratio-inner-container">
				<div className="drum-machine-container">
					<div className="display-block">
						<div className="title-block">
							<p>Good Beats</p>
						</div>
					</div>
					<div className="display-block">
						<DisplayBanks onBankChange={this.handleBankChange} selectedBank={this.state.selectedBank} />
					</div>
					<div className="display-block drumpads-block">
						<DrumPad soundBank={this.state.soundBank} onInput={this.handleInput} />
					</div>
					<div className="display-block">
						<DisplayMessage message={this.state.currentSound} />
					</div>
				</div>
			</div>
		);
	}
}

export default DrumMachine;
