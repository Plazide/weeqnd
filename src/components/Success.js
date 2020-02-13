import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// models
import success from "../models/success";

export default function Success ({ type, onSuccessExpire }){
	const[hidden, setHidden] = useState(true);

	useEffect( () => {
		if(type){
			setHidden(false);
			const expire = async () => {
				setTimeout( () => {
					onSuccessExpire();
					setHidden(true);
				}, 4000 );
			};
			expire();
		}
	});

	return(
		<div className={`page-status success ${hidden ? "hidden" : ""}`} role="status">
			<div className="inner">
				<div className="header">
					<span className="heading">Det fungerade!</span>
				</div>
				<div className="message">{success[type]}</div>
			</div>
		</div>
	);
}

Success.propTypes = {
	type: PropTypes.string.isRequired,
	onSuccessExpire: PropTypes.func.isRequired
};
