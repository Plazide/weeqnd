import React from "react";

// Components
import Party from "./Party";
import Code from "./Code";

import "./style.css";

const Settings = () => {
	return(
		<section className="settings view">
			<div className="content">
				<Code />
				<Party />
			</div>
		</section>
	);
};

export default Settings;
