import React from "react";
import css from "./OnError.module.css";

const OnError = ({ children }) => {
	return <div class={css["wrapper"]}>{children}</div>;
};

export default OnError;
