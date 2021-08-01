import Table from "../Table/Table";
import Button from "../Button/Button";
import DropDown from "../DropDown/DropDown";
import classes from "./OrderBook.module.css";

interface Props {
	onKillFeed: () => void,
	onToggleFeed: () => void,
	orders: any
}

const OrderBook  : React.FC<Props> = ({
	onKillFeed,
	onToggleFeed,
	orders
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
				<div>
					<DropDown
						options={[
							{ label: "0.25", value: "0.25" },
							{ label: "0.5", value: "0.5" },
							{ label: "1", value: "1" },
						]}
					/>
				</div>
			</div>

			<div className={classes.orderBookBody}>
				<div className={classes.buyPrice}>
					<Table
						rows={orders.bids}
						columns={columns}
					/>
				</div>

				<div className={classes.sellPrice}>
					<Table
						rows={orders.asks}
						columns={columns}
					/>
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
