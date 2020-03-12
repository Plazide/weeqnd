import React, { useContext } from "react";

// Components
import Info from "../Info/";

// contexts
import { PartyContext } from "../../contexts";

// Util
import { formatCode, share } from "../../js/util";

// Images
import ShareIcon from "../../images/icons/share.svg";

export default function Code(){
	const{ code, owner } = useContext(PartyContext);

	return(
		<div className="settings__code">
			<h2>Party code<Info>The code used to access the party</Info></h2>
			<div className="settings__code__display">
				<span>{formatCode(code)}</span>
				<button
					className="settings__code__share"
					onClick={() => {
						share({
							title: `${owner}'s party`,
							text: `Join ${owner}'s party to add your own songs`,
							url: `https://weeqnd.party/p/${code}`
						});
					}}
				>
					<ShareIcon />
				</button>
			</div>
		</div>
	);
}
