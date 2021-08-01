import Table from "../Table/Table";
import Button from "../Button/Button";
import classes from "./OrderBook.module.css";

interface Props {
	onKillFeed: () => void,
	onToggleFeed: () => void,
	bids: any,
	asks: any
}

const OrderBook  : React.FC<Props> = ({
	onKillFeed,
	onToggleFeed,
	bids,
	asks
}) => {
	const columns = {
		total: {
			title: "Total"
		},
		size: {
			title: "Size"
		},
		price: {
			title: "price"
		}
	};

	return (
		<div className={classes.container}>
			<div className={classes.orderBookHeader}>
				<div>Order Book</div>
				<div className={classes.spreadHeader}>Spread: 17.0 (0.05%)</div>
				<div>Group 0.50%</div>
			</div>

			<div className={classes.orderBookBody}>
				<div className={classes.buyPrice}>
					<Table rows={bids} columns={columns}/>
				</div>

				<div className={classes.sellPrice}>
					<Table rows={asks} columns={columns}/>
				</div>
			</div>

			<div className={classes.buttonsContainer}>
				<Button
					onClick={onKillFeed}
					text="Kill Feed"
					backgroundColor="#5741D9"
				/>

				<Button
					onClick={onToggleFeed}
					text="Toggle Feed"
					backgroundColor="#B91D1D"
				/>
			</div>
		</div>
	);
};

export default OrderBook;
