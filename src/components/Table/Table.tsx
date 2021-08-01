import { useEffect, useState, useMemo } from "react";
import { getOrdersByPrice, getOrders, getOrdersByGroup } from "../../utils/getOrders";
import { OrdersByPriceType, SingleOrderType } from "../../types/Orders";
import classes from "./Table.module.css";

interface Columns {
    total: { title: string }
}

interface Props {
	rows: any[];
	columns: Columns;
}

const Table : React.FC<Props> = ({
	rows, columns
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
						return(
							<span
								key={column + entry}
								className={classes.rowCell}
							>
								{entry[column]}
							</span>
						);
					})}
				</div>
			))}
		</div>
	)
};

export default Table;
