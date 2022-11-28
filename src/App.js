import React, { Component } from "react";
import "./App.css";
import api from "./Services/api";
import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Button from "./Components/Button/Button";

class App extends Component {
	state = {
		images: [],
		isLoading: false,
		error: null,
		query: "",
		actualPage: 1,
		lastPage: 1,
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

	goToNextPage = () => {
		let { actualPage } = this.state;
		actualPage++;
		this.setState({ actualPage: actualPage });
	};

	async componentDidUpdate(prevProps, prevState) {
		if (prevState.query !== this.state.query) {
			const { query } = this.state;
			this.setState({ isLoading: true });
			try {
				const fetchedData = await api.fetchImageWithQuery(query, 1);
				const mapedImages = await this.mapNewImages(fetchedData.images);
				const lastPage = Math.ceil(fetchedData.total / 12);
				this.setState({ images: mapedImages, actualPage: 1, lastPage: lastPage });
			} catch (error) {
				this.setState({ error });
			} finally {
				this.setState({ isLoading: false });
			}
		}

		if (prevState.actualPage !== this.state.actualPage && prevState.query === this.state.query) {
			const { query, actualPage, images } = this.state;
			this.setState({ isLoading: true });
			try {
				const fetchedData = await api.fetchImageWithQuery(query, actualPage);
				const mapedImages = await this.mapNewImages(fetchedData.images);
				const concatImages = images.concat(mapedImages);
				this.setState({ images: concatImages });
			} catch (error) {
				this.setState({ error });
			} finally {
				this.setState({ isLoading: false });
			}
		}
	}

	render() {
		const { images, actualPage, lastPage } = this.state;
		return (
			<>
				<Searchbar onSubmit={this.updateQuery}></Searchbar>
				<ImageGallery images={images}></ImageGallery>
				{actualPage !== lastPage ? <Button onClick={this.goToNextPage}></Button> : ""}
			</>
		);
	}
}

export default App;
