import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

// Components
import Radio from "../Radio/";
import Info from "../Info/";

// Contexts
import { MethodContext } from "../../contexts";

export default function PlaybackDevice({ devices = [] }){
	const[selected, setSelected] = useState();
	const{ changePlaybackDevice } = useContext(MethodContext);

	useEffect( () => {
		const device = devices.find( device => device["is_active"]);

		if(device && device["is_active"])
			setSelected(device.id);
	}, [devices]);

	const onChange = id => {
		setSelected(id);
		changePlaybackDevice(id);
	};

	return(
		<div className="settings__playback component">
			<h2>Playback device <Info>Select the device that the music will play on</Info></h2>
			<form className="settings__playbackForm">
				{devices.length === 0
					? "You have no active devices. Open spotify on the device you want play from, and then select it here."
					: <DeviceList devices={devices} onChange={onChange} selected={selected} />
				}
			</form>
		</div>
	);
}

const DeviceList = ({ devices, onChange, selected }) => (
	devices.map( device => (
		<PlaybackRadio
			device={device}
			selected={selected}
			key={device.id}
			onChange={onChange}
		/>
	))
);

const PlaybackRadio = ({ device, selected, onChange }) => {
	return(
		<label
			className={`settings__playbackRadio ${selected === device.id ? "settings__playbackRadio--checked" : ""}`}
		>
			<Radio
				className="settings__playbackRadioButton"
				name="device"
				selected={selected}
				value={device.id}
				id={device.id}
				onChange={ () => { onChange(device.id); }}
			/>
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
	onChange: PropTypes.func
};
