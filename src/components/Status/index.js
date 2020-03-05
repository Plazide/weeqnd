import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// models
import errors from "../../models/errors";
import success from "../../models/success";

// css
import "./style.css";

export default function Status({ type, msgCode, onExpire }){
	const[hidden, setHidden] = useState(true);
	const delay = type === "error" ? 6000 : 4000;
	const role = type === "error" ? "alert" : "status";
	const messages = type === "error" ? errors : success;

	useEffect( () => {
		if(msgCode){
			setHidden(false);
			const expire = async () => {
				setTimeout( () => {
					onExpire();
					setHidden(true);
				}, delay );
			};
			expire();
		}
	});

	return(
		<div className={`page-status ${type} ${hidden ? "hidden" : ""}`} role={role}>
			<div className="inner">
				<div className="message">{messages[msgCode]}</div>
			</div>
		</div>
	);
}

Status.propTypes = {
	type: PropTypes.string.isRequired,
	onExpire: PropTypes.func.isRequired,
	msgCode: PropTypes.string.isRequired
};
