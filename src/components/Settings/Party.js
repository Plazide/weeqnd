import React, { useContext } from "react";
import PropTypes from "prop-types";

// Components
import Info from "../Info/";
import Button from "../Button/";

// Contexts
import { PartyContext, MethodContext } from "../../contexts";

export default function Party(){
	const{ active } = useContext(PartyContext);
	const{ deactivateParty, activateParty } = useContext(MethodContext);

	return(
		<div className="settings__party component">
			<h2>Party<Info>You can deactivate your party to disable playback control and disallow people from adding more songs</Info></h2>

			{active
				? <Deactivate onClick={deactivateParty} />
				: <Activate onClick={activateParty} />
			}
		</div>
	);
}

const Activate = ({ onClick }) => (
	<Button
		className="settings__party__button"
		variant="outlined"
		onClick={onClick}
	>
		Activate
	</Button>
);

const Deactivate = ({ onClick }) => (
	<Button
		className="settings__party__button settings__party__button--deactivate"
		variant="outlined"
		onClick={onClick}
	>
		Deactivate
	</Button>
);

Activate.propTypes = {
	onClick: PropTypes.func
};

Deactivate.propTypes = {
	onClick: PropTypes.func
};
