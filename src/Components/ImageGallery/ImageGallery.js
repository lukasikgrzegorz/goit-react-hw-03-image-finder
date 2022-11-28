import React, { Component } from "react";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import css from "./ImageGallery.module.css";

class ImageGallery extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.page !== 1 && this.props.images.length !== prevProps.images.length) {
			window.scrollBy({ top: 520, behavior: "smooth" });
		}
	}
	render() {
		const { images } = this.props;
		return (
			<ul className={css["image-gallery"]}>
				{images.map((image) => {
					return (
						<ImageGalleryItem key={image.id} id={image.id} src={image.small}></ImageGalleryItem>
					);
				})}
			</ul>
		);
	}
}

export default ImageGallery;
