import { useState } from "react";
import Table from "../Table/Table";
import Button from "../Button/Button";
import DropDown from "../DropDown/DropDown";
import { OrderType, Product } from "../../types/Enums";
import { OrdersType } from "../../types/Orders";
import Error from "../Error/Error";
import { PRODUCT_OPTIONS } from "../../config/config";
import classes from "./OrderBook.module.css";

interface Props {
	onKillFeed: () => void,
	onToggleFeed: () => void,
	isSocketOpened: boolean,
	marketId: Product.PI_ETHUSD | Product.PI_XBTUSD,
	orders: { asks: OrdersType, bids: OrdersType }
};

const OrderBook  : React.FC<Props> = ({
	onKillFeed,
	onToggleFeed,
	orders,
	isSocketOpened,
	marketId
}) => {
	const [group, setGroup] = useState(0.5);

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

	const onChooseGroup = (value: number) => {
		setGroup(value);
	}

	return (
		<div className={classes.container}>
			{!isSocketOpened ? <Error/> : null}
			<div
				className={classes.orderBookHeader}
			>
				<div>Order Book {marketId}</div>
				<div className={classes.spreadHeader}>Spread: 17.0 ({group}%)</div>
				<div>
					<DropDown
						options={PRODUCT_OPTIONS[marketId]}
						onSelect={onChooseGroup}
					/>
				</div>
			</div>

			<div
				className={classes.orderBookBody}
				style={
					!isSocketOpened ? { opacity: "0.3" } : {}
				}
			>
				<div className={classes.buyPrice}>
					<Table
						rows={orders.bids}
						columns={columns}
						type={OrderType.BID}
						group={group}
					/>
				</div>

				<div className={classes.sellPrice}>
					<Table
						rows={orders.asks}
						columns={columns}
						type={OrderType.ASK}
						group={group}
					/>
				</div>
			</div>

			<div className={classes.buttonsContainer}>
				<Button
					onClick={onKillFeed}
					text={isSocketOpened ? "Kill Feed" : "Start Feed"}
					backgroundColor="#5741D9"
					style={{
						marginRight: 15
					}}
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
