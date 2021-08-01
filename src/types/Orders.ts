export type OrdersType = [number, number][];

export type OrdersByPriceType = Record<
  string,
  {
    price: number;
    size: number;
  }
>;

export type SingleOrderType = Record<
	string,
	{
		price: number;
		size: number;
		total: number;
	}
>;