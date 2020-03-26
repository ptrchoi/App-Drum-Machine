import firebase from 'firebase';

// App's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCIotbfCNVML7xhReBGznVilTN_BeAQkuE',
	authDomain: 'drum-machine-9e595.firebaseapp.com',
	databaseURL: 'https://drum-machine-9e595.firebaseio.com',
	projectId: 'drum-machine-9e595',
	storageBucket: 'drum-machine-9e595.appspot.com',
	messagingSenderId: '494750674085',
	appId: '1:494750674085:web:9ce45dd3ec5a17f4e3b14c'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
