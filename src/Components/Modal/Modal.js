import React, { Component } from "react";
import css from "./Modal.module.css";
import PropTypes from "prop-types";

class Modal extends Component {
	static propTypes = {
		src: PropTypes.string.isRequired,
		alt: PropTypes.string.isRequired,
		closeHandler: PropTypes.func.isRequired,
		escHandler: PropTypes.func.isRequired,
	};

	componentDidMount() {
		document.addEventListener("keydown", this.props.escHandler);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.props.escHandler);
	}

	render() {
		const { src, alt, closeHandler } = this.props;
		return (
			<div className={css["overlay"]} onClick={closeHandler}>
				<div className={css["modal"]}>
					<img src={src} alt={alt} />
				</div>
			</div>
		);
	}
}

export default Modal;
