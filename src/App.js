import React, { Component } from "react";
import "./App.css";
import api from "./Services/api";
import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Button from "./Components/Button/Button";
import Loader from "./Components/Loader/Loader";
import Modal from "./Components/Modal/Modal";
import OnError from "./Components/OnError/OnError";

class App extends Component {
	state = {
		images: [],
		isLoading: false,
		error: null,
		query: "",
		actualPage: 1,
		lastPage: 1,
		modalIsOpen: false,
	};

	modalInfo = {
		modalPhotoURL: null,
		modalAlt: null,
	};

	updateQuery = ({ query }) => {
		this.setState({ query: query });
	};

	mapNewImages = (fetchedImages) => {
		const mapedImages = fetchedImages.map((image) => ({
			id: image.id,
			small: image.webformatURL,
			large: image.largeImageURL,
			alt: image.tags,
		}));
		return mapedImages;
	};

	goToNextPage = () => {
		let { actualPage } = this.state;
		actualPage++;
		this.setState({ actualPage: actualPage });
	};

	openModal = (e) => {
		this.setState({
			modalIsOpen: true,
		});

		this.modalInfo = {
			modalPhotoURL: e.target.dataset["source"],
			modalAlt: e.target.alt,
		};
	};

	closeModal = (e) => {
		if (e.target.nodeName !== "IMG") {
			this.setState({
				modalIsOpen: false,
			});
		}
	};

	closeModalwithButton = (e) => {
		if (e.key === "Escape") {
			this.setState({
				modalIsOpen: false,
			});
		}
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
		const { images, actualPage, lastPage, isLoading, modalIsOpen, query } = this.state;
		const { modalPhotoURL, modalAlt } = this.modalInfo;

		return (
			<>
				{modalIsOpen && (
					<Modal
						src={modalPhotoURL}
						alt={modalAlt}
						closeHandler={this.closeModal}
						escHandler={this.closeModalwithButton}
					></Modal>
				)}
				<Searchbar onSubmit={this.updateQuery}></Searchbar>
				<ImageGallery
					images={images}
					page={actualPage}
					clickHanlder={this.openModal}
				></ImageGallery>
				{actualPage !== lastPage && images.length > 0 && isLoading === false ? (
					<Button onClick={this.goToNextPage}></Button>
				) : (
					""
				)}
				{isLoading && <Loader></Loader>}
				{images.length === 0 && query !== "" && isLoading === false && (
					<OnError>Nothing found! Try again</OnError>
				)}
			</>
		);
	}
}

export default App;
