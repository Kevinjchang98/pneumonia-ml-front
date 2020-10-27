import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
	const [ file, setFile ] = useState();
	const fileSelectedHandler = (event) => {
		console.log(event.target.files[0]);
		setFile(event.target.files[0]);
	};

	const fileUploadHandler = () => {
		console.log('upload button clicked');
		const fd = new FormData();
		fd.append('image', file, file.name);
		axios.post('http://127.0.0.1:8000/predict').then((res) => {
			console.log(res);
		});
	};

	return (
		<div className="App">
			<h1>Header</h1>
			<input type="file" onChange={fileSelectedHandler} />
			<button onClick={fileUploadHandler}>Upload</button>
		</div>
	);
}

export default App;
