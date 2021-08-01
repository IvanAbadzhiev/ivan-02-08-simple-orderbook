
import classes from "./Error.module.css";

const Error = () => {
	return (
		<div className={classes.errorContainer}>
			Something went wrong! Please check your 
			internet connection.
		</div>
	);
};

export default Error;
