import React from "react";
import css from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ id, src, alt, data, clickHanlder }) => {
	return (
		<li className={css["item"]}>
			<img
				className={css["item-image"]}
				id={id}
				src={src}
				alt={alt}
				data-source={data}
				onClick={clickHanlder}
			></img>
		</li>
	);
};

export default ImageGalleryItem;
