import { Axios } from "@/configs/axios.config";
import type {
  IGetTokenPriceAllRequest,
  IGetTokenPriceDetailRequest,
  IGetTokenPriceAllResponse,
  IGetTokenPriceDetailResponse,
} from "@/types/token.d";
import { encodeQuery } from "@/utils/param.util";

const getTokenPriceAll = async (
  getTokenPriceAllRequest: IGetTokenPriceAllRequest
) => {
  const query = encodeQuery(getTokenPriceAllRequest);
  const response = await Axios.get<IGetTokenPriceAllResponse>(`/api/price-token?${query}`);
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

export { getTokenPriceAll, getTokenDetail };
