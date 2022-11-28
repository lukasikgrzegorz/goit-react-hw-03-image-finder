import React from "react";
import css from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ id, src }) => {
	return (
		<li className={css["item"]}>
			<img className={css["item-image"]} id={id} src={src} alt={id}></img>
		</li>
	);
};

export default ImageGalleryItem;
