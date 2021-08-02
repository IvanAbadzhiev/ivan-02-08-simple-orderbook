import { OrdersType, OrdersByPriceType } from "../types/Orders";
import valueWithGroup from "./valueWithGroup";

/*
	Calculate the set with the group that is selected by 
	the user
*/
export const getOrdersByGroup = (orders: OrdersByPriceType, group: number) => {
	return Object.keys(orders).reduce(
		(currentOrders: OrdersByPriceType, orderPrice: string) => {
			const { size } = orders[orderPrice];
			const groupKeyPrice = valueWithGroup(+(orderPrice), group);
			const groupField = currentOrders[groupKeyPrice];
		
			if (groupField) {
				const { size: prevSize } = groupField;

				return {
					...currentOrders,
					[groupKeyPrice]: {
						size: prevSize + size,
						price: groupKeyPrice,
					},
				};
			}

			return {
				...currentOrders,
				[groupKeyPrice]: {
					size: size,
					price: groupKeyPrice
				}
			};
		},
		{}
	);
};

/*
	Calculate the total value for each row
*/
export const getOrders = (groupedOrdersByPrice: OrdersByPriceType) => {
	return Object.keys(groupedOrdersByPrice)
		.sort((a, b) => +(a) - +(b))
		.splice(0, 10) // TODO: Consider this limitation
		.reduce((orders: any, orderKey) => {
			const { price, size } = groupedOrdersByPrice[orderKey];
			const prevTotalSize = orders[orders.length - 1];
			const totalSize = prevTotalSize ? prevTotalSize.total + size : size;
  
			return [
				...orders,
				{
					total: totalSize,
					size: size,
					price: price,
				},
			];
	}, []);
}

/*
	Get the initial orders from the socket and convert
	them to object
*/
export const getOrdersByPrice = (
	orders: OrdersType,
	prevOrders: OrdersByPriceType,
) => {
	const updatedOrders = { ...prevOrders };

	for (let index = 0; index < orders.length; index += 1) {
		const [price, size] = orders[index];
		
		//If the size is zero remove the ement
		if (size === 0) {
			delete updatedOrders[price];
		} else {
			updatedOrders[price] = {
				size: size,
				price: price,
			};
		}
	}
  
	return updatedOrders;
};