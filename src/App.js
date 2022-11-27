import React, { Component } from "react";
import "./App.css";
import Searchbar from "./Components/Searchbar/Searchbar";
import api from "./Services/api";

class App extends Component {
	state = {
		images: [],
		isLoading: false,
		error: null,
		query: "",
		actualPage: 1,
	};

	updateQuery = ({ query }) => {
		this.setState({ query: query });
		console.log(this.state.images);
	};

	mapNewImages = (fetchedImages) => {
		const mapedImages = fetchedImages.map((image) => ({
			id: image.id,
			small: image.webformatURL,
			large: image.largeImageURL,
		}));

		return mapedImages;
	};

	async componentDidUpdate(prevProps, prevState) {
		if (prevState.query != this.state.query) {
			const { query, page, images } = this.state;
			this.setState({ isLoading: true });
			try {
				const fetchedImages = await api.fetchImageWithQuery(query, page);
				const mapedImages = await this.mapNewImages(fetchedImages);
				// const concatImages = images.concat(mapedImages);
				this.setState({ images: mapedImages });
			} catch (error) {
				this.setState({ error });
			} finally {
				this.setState({ isLoading: false });
			}
		}
	}

	render() {
		return (
			<>
				<Searchbar onSubmit={this.updateQuery}></Searchbar>
			</>
		);
	}
}

export default App;
