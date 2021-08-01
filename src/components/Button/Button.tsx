
import classes from "./Button.module.css";

interface Props {
	onClick: () => void,
	backgroundColor: string,
	text: string,
	style?: {}
}

const Button : React.FC<Props> = ({
	onClick,
	text,
	backgroundColor,
	style
}) => {
	return (
		<button
			className={classes.button}
			onClick={onClick}
			style={{
				backgroundColor,
				...style
			}}
		>
			{text}
		</button>
	)
}

export default Button;
