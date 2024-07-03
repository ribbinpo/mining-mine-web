import { Axios } from "@/configs/axios.config";
import type {
  IGetTokenPriceAllRequest,
  IGetTokenPriceDetailRequest,
  IGetTokenPriceAllResponse,
  IGetTokenPriceDetailResponse,
  Currency,
} from "@/types/token.d";
import { encodeQuery } from "@/utils/param.util";

const getTokenPriceAll = async (
  getTokenPriceAllRequest: IGetTokenPriceAllRequest
) => {
  const query = encodeQuery(getTokenPriceAllRequest);
  const response = await Axios.get<IGetTokenPriceAllResponse>(
    `/api/price-token?${query}`
  );
  return response;
};

const getTokenDetail = async (
  getTokenPriceDetailRequest: IGetTokenPriceDetailRequest
) => {
  const query = encodeQuery(getTokenPriceDetailRequest);
  const response = await Axios.get<IGetTokenPriceDetailResponse>(
    `/api/price-token/describe?${query}`
  );
  return response;
};

const getCurrentPrices = async () => {
  const currency: Array<Currency> = ["USDT", "BTC", "ETH"];
  const list = currency.map(async (cur) => {
    const res = await getTokenDetail({
      currency: cur,
      fiatAmounts: 1000,
      type: "BUY",
    });
    return { label: cur, ...res.data };
  });
  return await Promise.all(list);
};

export { getTokenPriceAll, getTokenDetail, getCurrentPrices };
