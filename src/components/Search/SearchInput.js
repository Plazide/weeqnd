import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import useDebounce from "../../js/debounce";

// Icons
import SearchIcon from "../../images/icons/search-icon.svg";
import CloseIcon from "../../images/icons/close.svg";

const SearchInput = ({ onSearch }) => {
	const[value, setValue] = useState("");
	const[focus, setFocus] = useState(false);
	const input = useRef(null);

	const debouncedValue = useDebounce(value, 500);

	const onBlur = () => {
		if(!value)
			setFocus(false);
	};

	const onFocus = () => {
		setFocus(true);
	};

	const focusInput = () => {
		input.current.focus();
	};

	const clearInput = () => {
		setValue("");
	};

	const onChange = (e) => {
		const target = e.target;
		const value = target.value;

		setValue(value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		onSearch(value);
	};

	useEffect( () => {
		focusInput();

		if(debouncedValue)
			onSearch(debouncedValue);
	}, [debouncedValue]);

	return(
		<div className="search-input">
			<form onSubmit={onSubmit}>
				<label>
					<span className="label">{focus ? "" : "Sök på en låt..."}</span>
					<input
						type="text"
						ref={input}
						onChange={onChange}
						value={value}
						onFocus={onFocus}
						onBlur={onBlur}
					/>
					{value.length > 0
						? (<button><CloseIcon className="icon" onClick={clearInput} /></button>)
						: (<button><SearchIcon className="icon" onClick={focusInput} /></button>)
					}

				</label>
			</form>
		</div>
	);
};

SearchInput.propTypes = {
	onSearch: PropTypes.func.isRequired
};

export default SearchInput;
