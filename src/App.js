import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
	const [ file, setFile ] = useState();
	const [ hasPredicted, setHasPredicted ] = useState(false);
	const [ prediction, setPrediction ] = useState();
	const fileSelectedHandler = (event) => {
		console.log(event.target.files[0]);
		setFile(event.target.files[0]);
	};

	const fileUploadHandler = () => {
		console.log('upload button clicked');
		const fd = new FormData();
		fd.append('image', file, file.name);
		console.log(fd);
		axios
			.post('https://pneumonia-prediction-ml.herokuapp.com/predict', fd)
			.then((res) => {
				setPrediction(res.data.prediction);
			})
			.then(() => {
				setHasPredicted(true);
				console.log('prediction received');
			});
	};

	return (
		<div className="App">
			<h1>Header</h1>
			<input type="file" onChange={fileSelectedHandler} />
			<br />
			<button onClick={fileUploadHandler}>Upload</button>
			<br />
			{hasPredicted ? 'Prediction: ' + prediction : null}
		</div>
	);
}

export default App;
