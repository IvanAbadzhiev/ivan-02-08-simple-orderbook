
import { useState, useMemo } from "react";
import { WS_URL } from "../../config/config";
import OrderBook from "./OrderBook";

enum Product {
	PI_XBTUSD = "PI_XBTUSD",
	PI_ETHUSD = "PI_ETHUSD"
}

enum WebsocketEventEnum {
	SUBSCRIBE = "subscribe",
	UNSUBSCRIBE = "unsubscribe"
}

const OrderBookContainer = () => {
	const [marketId, setMarketId] = useState(Product.PI_XBTUSD);
	const [orders, setOrders] = useState([]);

	const webSocket = useMemo(() => new WebSocket(WS_URL), []);

	webSocket.onopen = (data) => {
		webSocket.send(JSON.stringify({
			"event": WebsocketEventEnum.SUBSCRIBE,
			"feed": "book_ui_1",
			"product_ids":[ Product.PI_XBTUSD ]
		}));
	}
	
	webSocket.onmessage = (event) => {
		const parsedData = JSON.parse(event.data);
		setOrders(parsedData);
	}

	const unsubscribe = () => {
		const message = {
			event: WebsocketEventEnum.UNSUBSCRIBE,
			feed: 'book_ui_1',
			product_ids: [marketId],
		};
		
		webSocket.send(JSON.stringify(message));
	}

	const onToggleFeed = () => {
		if(marketId === Product.PI_ETHUSD) {
			setMarketId(Product.PI_XBTUSD);
		} else {
			setMarketId(Product.PI_ETHUSD);
		}
	};

	return (
		<OrderBook
			onKillFeed={unsubscribe} 
			orders={orders}
			onToggleFeed={onToggleFeed}
		/>
	);
};

export default OrderBookContainer;
