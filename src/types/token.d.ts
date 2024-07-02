export type Currency = "USDT" | "BTC" | "ETH";

export type Amount = 1000 | 10000 | 100000;

export type OrderType = "BUY" | "SELL";

export interface IGetTokenPriceAllRequest {
  fiatAmounts: Amount;
  type: OrderType;
  startDate?: Date;
  endDate?: Date;
}

export interface IGetTokenPriceAllResponse {
  avg_price: number;
  latest_price: number;
  data: {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: Date;
    price: number;
    crypto_currency: Currency;
    fiat_amount: "THB";
    amount_fiat_selected: Amount;
    type: OrderType;
  }[];
}

export interface IGetTokenPriceDetailRequest {
  currency: Currency;
  fiatAmounts: Amount;
  type: OrderType;
}

export interface IGetTokenPriceDetailResponse {
  avg_price: number;
  lastest_price: number;
  min_price: number;
  max_price: number;
}
