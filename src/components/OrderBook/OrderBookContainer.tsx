
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
	const [askList, setAskList] = useState([]);
	const [bidList, setBidList] = useState([]);

	const webSocket = useMemo(() => new WebSocket(WS_URL), []);

	webSocket.onopen = (data) => {
		console.log("we are connected");
		console.log(data);

		webSocket.send(JSON.stringify({
			"event": WebsocketEventEnum.SUBSCRIBE,
			"feed": "book_ui_1",
			"product_ids":[ Product.PI_XBTUSD ]
		}));
	}
	
	webSocket.onmessage = (event) => {
		const parsedData = JSON.parse(event.data);
		
		// Set bids list
		if(parsedData.bids) {
			const bids = parsedData.bids.map((bid: Array<number>) => {
				return {
					price: bid[0],
					size: bid[1],
					total: bid[0] + bid[1]
				}
			});
	
			setBidList(bids);
		}

		// Set asks list
		if(parsedData.asks) {
			const bids = parsedData.asks.map((ask: Array<number>) => {
				return {
					price: ask[0],
					size: ask[1],
					total: ask[0] + ask[1]
				}
			});
	
			setAskList(bids);
		}
		
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
			bids={bidList}
			asks={askList}
			onToggleFeed={onToggleFeed}
		/>
	);
};

export default OrderBookContainer;
