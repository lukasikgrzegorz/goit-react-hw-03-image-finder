import React, { Component } from "react";
import "./App.css";
import api from "./Services/api";
import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Button from "./Components/Button/Button";
import Loader from "./Components/Loader/Loader";

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
				window.scrollTo({ top: 0, behavior: "smooth" });
			} catch (error) {
				this.setState({ error });
			} finally {
				this.setState({ isLoading: false });
			}
		}

		if (
			prevState.actualPage !== this.state.actualPage &&
			prevState.query === this.state.query &&
			this.state.actualPage !== 1
		) {
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
		const { images, actualPage, lastPage, isLoading } = this.state;
		return (
			<>
				<Searchbar onSubmit={this.updateQuery}></Searchbar>
				<ImageGallery images={images} page={actualPage}></ImageGallery>
				{actualPage !== lastPage && images.length > 0 && isLoading === false ? (
					<Button onClick={this.goToNextPage}></Button>
				) : (
					""
				)}
				{isLoading && <Loader></Loader>}
			</>
		);
	}
}

export default App;
