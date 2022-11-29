import React, { Component } from "react";
import css from "./Searchbar.module.css";
import PropTypes from "prop-types";

class Searchbar extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
	};

	handleSumbit = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		const query = form.elements.query.value;
		this.props.onSubmit({ query });
	};

	render() {
		return (
			<header className={css["searchbar"]}>
				<form className={css["form"]} onSubmit={this.handleSumbit}>
					<button type="submit" className={css["button"]}>
						<span className={css["button-label"]}>Search</span>
					</button>

					<input
						name="query"
						className={css["input"]}
						type="text"
						autoComplete="off"
						autoFocus
						placeholder="Search images and photos"
					/>
				</form>
			</header>
		);
	}
}

export default Searchbar;
