import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
	const [ hasFile, setHasFile ] = useState(false);
	const [ file, setFile ] = useState();
	const [ imagePreview, setImagePreview ] = useState();
	const [ isLoading, setIsLoading ] = useState(false);
	const [ hasPredicted, setHasPredicted ] = useState(false);
	const [ prediction, setPrediction ] = useState();

	const fileSelectedHandler = (event) => {
		setFile(event.target.files[0]);
		setImagePreview(URL.createObjectURL(event.target.files[0]));
		setHasFile(true);
	};

	const fileUploadHandler = () => {
		setIsLoading(true);
		const fd = new FormData();
		fd.append('image', file, file.name);
		axios
			.post('https://pneumonia-prediction-ml.herokuapp.com/predict', fd)
			.then((res) => {
				setPrediction(res.data.prediction);
			})
			.then(() => {
				setHasPredicted(true);
				setIsLoading(false);
			});
	};

	return (
		<div className="App">
			<h1>Header</h1>
			<input type="file" onChange={fileSelectedHandler} />
			<br />
			{hasFile ? <img className="Preview" src={imagePreview} alt="Preview" /> : null}
			<br />
			<button onClick={fileUploadHandler}>Upload</button>
			<br />
			{isLoading ? 'Loading' : null}
			{hasPredicted ? 'Prediction: ' + prediction : null}
		</div>
	);
}

export default App;
