import { Product } from "../types/Enums";

export const WS_URL = "wss://www.cryptofacilities.com/ws/v1";
export const PRODUCT_OPTIONS = {
	[Product.PI_ETHUSD]: ["0.05", "0.1", "0.25"],
	[Product.PI_XBTUSD]: ["0.5", "1", "2.5"]
}