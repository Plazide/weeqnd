import React from "react";

// Css
import "./styles/loader.css";

const Loader = ({ load = false, children, className = "" }) => {
	const loading = <div className={`loader ${className} ${load ? "load" : ""}`}></div>;

	return load ? loading : children;
};

export default Loader;
