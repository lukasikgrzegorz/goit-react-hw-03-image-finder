import React from "react";
import css from "./Button.module.css";
import PropTypes from "prop-types";

const Button = ({ onClick }) => {
	return (
		<div className={css["button-wrapper"]}>
			<button onClick={onClick} className={css["button"]}>
				Load more
			</button>
		</div>
	);
};

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default Button;
