import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// models
import errors from "../models/errors";

// css
import "./styles/status.css";

export default function Error({ type, onErrorExpire }){
	const[hidden, setHidden] = useState(true);

	useEffect( () => {
		if(type){
			setHidden(false);
			const expire = async () => {
				setTimeout( () => {
					onErrorExpire();
					setHidden(true);
				}, 6000 );
			};
			expire();
		}
	});

	return(
		<div className={`page-status error ${hidden ? "hidden" : ""}`} role="alert">
			<div className="inner">
				<div className="message">{errors[type]}</div>
			</div>
		</div>
	);
}

Error.propTypes = {
	type: PropTypes.string.isRequired,
	onErrorExpire: PropTypes.func.isRequired
};
