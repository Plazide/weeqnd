import React from "react";

// Css
import "./style.css";

const Loader = ({ load = false, children, className = "" }) => {
	const loading = <div className={`loader ${className} ${load ? "load" : ""}`}></div>;

	return load ? loading : children;
};

export default Loader;
