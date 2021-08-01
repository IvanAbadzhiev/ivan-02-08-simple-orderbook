
import { useState, useMemo } from "react";
import { WS_URL } from "../../config/config";
import OrderBook from "./OrderBook";
import { Product, WebsocketEventEnum } from "../../types/Enums";

const OrderBookContainer = () => {
	const [isSocketOpened, setIsSocketOpened] = useState(false);
	const [marketId, setMarketId] = useState(Product.PI_XBTUSD);
	const [orders, setOrders] = useState([]);

	const webSocket = useMemo(() => new WebSocket(WS_URL), []);

	webSocket.onopen = () => {
		webSocket.send(JSON.stringify({
			"event": WebsocketEventEnum.SUBSCRIBE,
			"feed": "book_ui_1",
			"product_ids":[ Product.PI_XBTUSD ]
		}));

		setIsSocketOpened(true);
	}
	
	webSocket.onmessage = (event) => {
		const parsedData = JSON.parse(event.data);
		setOrders(parsedData);
	};

	const unsubscribe = () => {
		let event;
		if(isSocketOpened) {
			event = WebsocketEventEnum.UNSUBSCRIBE;
		} else {
			event = WebsocketEventEnum.SUBSCRIBE
		}
		const message = {
			event: event,
			feed: 'book_ui_1',
			product_ids: [marketId],
		};
			
		webSocket.send(JSON.stringify(message));
	
		setIsSocketOpened(!isSocketOpened);
	};

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
			isSocketOpened={isSocketOpened}
			orders={orders}
			onToggleFeed={onToggleFeed}
			marketId={marketId}
		/>
	);
};

export default OrderBookContainer;
