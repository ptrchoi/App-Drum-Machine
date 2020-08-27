import React from 'react';
import ReactDOM from 'react-dom';

//Components
import DrumMachine from './Components/DrumMachine';

import './styles/app.scss';

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="app-aspect-ratio-container">
				<DrumMachine />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
