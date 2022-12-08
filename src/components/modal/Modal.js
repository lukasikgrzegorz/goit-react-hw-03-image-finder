import React, { Component } from "react";
import css from "./Modal.module.css";
import PropTypes from "prop-types";

class Modal extends Component {
	componentDidMount() {
		document.addEventListener("keydown", this.props.escHandler);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.props.escHandler);
	}

	render() {
		const { imgSrc, imgAlt, closeHandler } = this.props;
		return (
			<div className={css["overlay"]} onClick={closeHandler}>
				<div className={css["modal"]}>
					<img src={imgSrc} alt={imgAlt} />
				</div>
			</div>
		);
	}
}

Modal.propTypes = {
	imgSrc: PropTypes.string.isRequired,
	imgAlt: PropTypes.string.isRequired,
	closeHandler: PropTypes.func.isRequired,
	escHandler: PropTypes.func.isRequired,
};

export default Modal;
