import { useEffect, useState, useMemo, Fragment } from "react";
import { getOrdersByPrice, getOrders, getOrdersByGroup } from "../../utils/getOrders";
import { OrdersByPriceType, SingleOrderType } from "../../types/Orders";
import { OrderColor, OrderType } from "../../types/Enums";
import classes from "./Table.module.css";

interface Columns {
    total: { title: string }
}

interface Props {
	rows: any[];
	columns: Columns;
	type: String;
}

const Table : React.FC<Props> = ({
	rows, columns, type
}) => {
	const [orders, setOrders] = useState<OrdersByPriceType>({});
	const columnKeys = Object.keys(columns);

	useEffect(() => {
		if(rows?.length) {
			setOrders((previousOrders) => getOrdersByPrice(rows, previousOrders));
		}
		
	}, [rows, setOrders]);

	const group = "0.5";
	const defaultGroup = "0.5";

	const groupedOrdersByPrice = useMemo(() => {
		if (group === defaultGroup) {
			return orders;
		}

		return getOrdersByGroup(orders, group);
	  }, [orders, group, defaultGroup]);

	const ordersArr: SingleOrderType[] = useMemo(
		() => getOrders(groupedOrdersByPrice),
		[groupedOrdersByPrice],
	);

	const valueColor = type === OrderType.ASK ? OrderColor.GREEN : OrderColor.RED;
	
	return (
		<div className={classes.tableContainer}>
			<div className={classes.tableHeader}>
				{columnKeys.map((title) => (
						<span
							key={title}
							className={classes.headerCell}
						>	
							{title}
						</span>
					))}
			</div>

			{ordersArr.map((entry: SingleOrderType) => (
				<div
					className={classes.tableRow}
				>
					{columnKeys.map((column) => {
						const depth = Math.round(
							(+entry.total / +ordersArr[ordersArr.length - 1].total) * 100,
						);
						
						const styleProperties : any = {};
	
						if(type === OrderType.ASK) {
							styleProperties["left"] = 0;
							styleProperties["backgroundColor"] = "red";
						} else {
							styleProperties["right"] = 0;
							styleProperties["backgroundColor"] = "green";
						}

						const style = {
							width: `${depth}%`,
							...styleProperties
						}

						return(
							<Fragment>
								<span
									key={column + entry}
									className={classes.rowCell}
									style={
										column === "price" ? { color: valueColor } : {}
									}
								>
									{entry[column]}
								</span>
								<div
									className={classes.depth}
									style={style}
								></div>
							</Fragment>
						);
					})}
				</div>
			))}
		</div>
	)
};

export default Table;
