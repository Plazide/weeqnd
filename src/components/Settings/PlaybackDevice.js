import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

// Components
import Radio from "../Radio/";
import Info from "../Info/";

// Contexts
import { MethodContext } from "../../contexts";

export default function PlaybackDevice({ devices = [] }){
	const[selected, setSelected] = useState(null);
	const{ changePlaybackDevice } = useContext(MethodContext);

	useEffect( () => {
		const device = devices.find( device => device["is_active"]);

		if(device && device["is_active"])
			setSelected(device.id);
	}, [devices]);

	const onClick = id => {
		if(id !== selected){
			setSelected(id);
			changePlaybackDevice(id);
		}
	};

	return(
		<div className="settings__playback component">
			<h2>Playback device <Info>Select the device that the music will play on</Info></h2>
			<form className="settings__playbackForm">
				{devices.map( device => (
					<PlaybackRadio
						device={device}
						selected={selected}
						key={device.id}
						onClick={onClick}
					/>
				))}
			</form>
		</div>
	);
}

const PlaybackRadio = ({ device, selected, onClick }) => {
	const checked = selected === device.id;

	return(
		<label
			className={`settings__playbackRadio ${checked ? "settings__playbackRadio--checked" : ""}`}
			onClick={ () => { onClick(device.id); }}
		>
			<Radio
				className="settings__playbackRadioButton"
				name="device"
				selected={selected}
				value={device.id}
				id={device.id}
			/>

			{/* <div className="radioIcon"></div> */}
			<span className="settings__playbackRadioName">{device.name}</span>
		</label>
	);
};

PlaybackDevice.propTypes = {
	devices: PropTypes.array
};

PlaybackRadio.propTypes = {
	device: PropTypes.object,
	selected: PropTypes.string,
	onClick: PropTypes.func
};
