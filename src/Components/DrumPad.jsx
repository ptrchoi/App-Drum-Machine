import React from 'react';

class DrumPad extends React.Component {
	constructor(props) {
		super(props);

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown);
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);
	}
	handleKeyDown(e) {
		e.preventDefault();

		let key = e.key.toUpperCase();
		if (/Q|W|E|A|S|D|Z|X|C/.test(key)) {
			let button = document.getElementById(key).parentNode;
			if (button) {
				button.click();
			}
		}
	}
	handleClick(e) {
		e.preventDefault();

		if (e.target) {
			this.props.onInput(e.target);
		}
	}
	render() {
		let { soundBank } = this.props;

		let renderButtons = () => {
			return soundBank.map((soundObj) => {
				return (
					<button key={soundObj.buttonId} id={soundObj.buttonId} className="drum-pad" onClick={this.handleClick}  >
						<audio id={soundObj.audioId} className="clip" src={soundObj.src} />
						{soundObj.audioId}
					</button>
				);
			});
		};

		return <div className="drumpads-container">{renderButtons()}</div>;
	}
}

export default DrumPad;
