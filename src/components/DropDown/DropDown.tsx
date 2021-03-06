import React, { useState } from "react";
import classes from "./DropDown.module.css";

interface Props {
	options: number[];
	onSelect: (value: number) => void
}

const DropDown : React.FC<Props> = ({
	options,
	onSelect
}) => {
	const [opened, setOpened] = useState<Boolean>(false);
	const [selectedValue, setSelectedValue] = useState<number>(options[0]);

	const chooseOption = (value : number) => {
		setSelectedValue(value);
		// Hide the dropdown list
		setOpened(false);

		// Propagate to the parent component
		onSelect(value);
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
					{options.map((option: number) => {
						return (
							<div
								className={classes.option}
								key={option}
								onClick={() => chooseOption(option)}
							>
								{option}
							</div>
						);
					})}
				</div>
			) : null}	
		</div>
	);
};

export default DropDown;
