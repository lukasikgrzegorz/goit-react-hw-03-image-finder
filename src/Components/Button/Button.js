import React from "react";
import css from "./Button.module.css";

const Button = ({ onClick }) => {
	return (
		<div className={css["button-wrapper"]}>
			<button onClick={onClick} className={css["button"]}>
				Load more
			</button>
		</div>
	);
};

export default Button;
