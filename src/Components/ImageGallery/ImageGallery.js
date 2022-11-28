import React from "react";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images }) => {
	return (
		<ul className={css["image-gallery"]}>
			{images.map((image) => {
				return <ImageGalleryItem key={image.id} id={image.id} src={image.small}></ImageGalleryItem>;
			})}
		</ul>
	);
};

export default ImageGallery;
