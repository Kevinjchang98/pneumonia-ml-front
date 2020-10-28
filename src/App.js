import { useState } from 'react';
import axios from 'axios';
import './App.css';

import { FileInput, Button, Spinner, Card, Elevation, Divider } from '@blueprintjs/core';

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
		<div className="MainContainer">
			<Card elevation={Elevation.FOUR} className="MainCard">
				<div className="App">
					<h1 className="bp3-heading">Pneumonia X-Ray Classifier</h1>

					<Divider />
					<br />

					<h4 className="bp3-heading">Choose an X-Ray</h4>
					<FileInput type="file" onChange={fileSelectedHandler} />

					<br />
					<br />

					{hasFile ? <img className="Preview" src={imagePreview} alt="Preview" /> : null}

					<Divider />
					<br />
					<h4 className="bp3-heading">Submit X-Ray</h4>
					{isLoading ? <Spinner /> : <Button onClick={fileUploadHandler}>Upload</Button>}
					<br />
					{hasPredicted != isLoading ? (
						<div>
							<Divider />
							<br />
							<h4 className="bp3-heading">Prediction</h4>
							<h5 className="bp3-heading">{prediction}</h5>
						</div>
					) : null}
				</div>
			</Card>
		</div>
	);
}

export default App;
