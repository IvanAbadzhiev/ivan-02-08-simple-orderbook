
import classes from "./Button.module.css";

interface Props {
	onClick: () => void,
	backgroundColor: string,
	text: string
}

const Button : React.FC<Props> = ({
	onClick,
	text,
	backgroundColor
}) => {
	return (
		<button
			className={classes.button}
			onClick={onClick}
			style={{
				backgroundColor
			}}
		>
			{text}
		</button>
	)
}

export default Button;
