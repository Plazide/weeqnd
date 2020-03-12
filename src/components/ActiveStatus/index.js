import React from "react";
import PropTypes from "prop-types";

// Components
import Button from "../Button/";

// Css
import "./style.css";

export default function ActiveStatus({ isOwner, onActivate }){
	return(
		<div className="activeStatus" role="alert">
			<h1 className="activeStatus__heading">Party is not active</h1>
			<p className="activeStatus__paragraph">
				{"That means you can't add songs to the playlist and the playback control is disabled."}
			</p>

			{!isOwner ? (
				<p className="activeStatus__paragraph activeStatus__paragraph--highlight">
					{"Only the owner can activate the party."}
				</p>
			) : (
				<Button onClick={onActivate} variant="filled" className="activateButton">Activate party</Button>
			)}

		</div>
	);
}

ActiveStatus.propTypes = {
	onActivate: PropTypes.func,
	isOwner: PropTypes.bool
};
