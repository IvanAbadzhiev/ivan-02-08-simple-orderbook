import React, { useState } from "react";
import classes from "./DropDown.module.css";

interface Props {
	options: { value: string; label: string; }[];
}

const DropDown : React.FC<Props> = ({
	options
}) => {
	const [opened, setOpened] = useState<Boolean>(false);
	const [selectedValue, setSelectedValue] = useState<String>(options[0].value);

	const chooseOption = (value : String) => {
		setSelectedValue(value);
		// Hide the dropdown list
		setOpened(false);
	}
	return (
		<div className={classes.dropdown}>
		
			<button
				onClick={() => setOpened(!opened)}
				className={classes.dropdownButton}
			>
				Group {selectedValue}
			</button>
			
			{opened ? (
				<div className={classes.dropDownList}>
					{options.map((option) => {
						return (
							<div
								className={classes.option}
								key={option.value}
								onClick={() => chooseOption(option.value)}
							>
								{option.label}
							</div>
						);
					})}
				</div>
			) : null}	
		</div>
	);
};

export default DropDown;
