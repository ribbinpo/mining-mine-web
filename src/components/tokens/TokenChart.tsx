"use client";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardBody, Select, SelectItem } from "@nextui-org/react";

import { getTokenPriceAll } from "@/services/token.service";
import type {
  Currency,
  IGetTokenPriceAllRequest,
  ITokenPriceData,
  Amount,
} from "@/types/token";
import { formatDate } from "@/utils/time.util";
import { useMemo, useState } from "react";

const amountList: {
  label: string;
  key: string;
  value: Amount;
}[] = [
  {
    label: "1000",
    key: "1000",
    value: 1000,
  },
  {
    label: "10000",
    key: "10000",
    value: 10000,
  },
  {
    label: "100000",
    key: "100000",
    value: 100000,
  },
];

export default function TokenChart({ currency }: { currency: Currency }) {
  const [amountSelected, setAmountSelected] = useState("1000");
  const getTokenPriceAllQuery = async ({
    queryKey,
  }: QueryFunctionContext<[string, IGetTokenPriceAllRequest]>) => {
    const [_, { currency, fiatAmounts, type }] = queryKey;
    try {
      const res = await getTokenPriceAll({ currency, fiatAmounts });
      return res.data;
    } catch (err) {
      throw new Error(err as any);
    }
  };
  const { data, isLoading } = useQuery({
    queryKey: ["price", { currency, fiatAmounts: +amountSelected as Amount }],
    queryFn: getTokenPriceAllQuery,
  });

  const _data = useMemo(() => {
    return data?.data.reduce((acc, cur) => {
      // find the nearest buy and sell price within 1 second
      const found = acc.findIndex(
        (item) =>
          Math.abs(
            new Date(item.CreatedAt).getTime() -
              new Date(cur.CreatedAt).getTime()
          ) <= 1000
      );
      if (found === -1) {
        acc.push({
          ...cur,
          buyPrice: cur.type === "BUY" ? cur.price : undefined,
          sellPrice: cur.type === "SELL" ? cur.price : undefined,
        });
      } else {
        if (cur.type === "BUY") {
          acc[found].buyPrice = cur.price;
        } else {
          acc[found].sellPrice = cur.price;
        }
      }
      return acc;
    }, [] as Array<Omit<ITokenPriceData, "price"> & { buyPrice?: number; sellPrice?: number }>);
  }, [data]);
  return (
    <Card>
      <CardBody>
        <div className="flex justify-between p-3">
          <div className="text-3xl w-full">
            {data?.lastest_price} Bath/token
          </div>
          <div className="flex space-x-4 items-center w-full">
            <p>Filter: </p>
            <Select
              items={amountList}
              selectedKeys={[amountSelected]}
              onChange={(e) => setAmountSelected(e.target.value)}
              className="max-w-xs"
            >
              {(amountList) => (
                <SelectItem key={amountList.key}>{amountList.label}</SelectItem>
              )}
            </Select>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={_data}
            margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="CreatedAt"
              tickFormatter={(item) => `${formatDate(item)}`}
            />
            <YAxis dataKey="price" domain={["dataMin", "dataMax"]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="buyPrice" stroke="#8884d8" />
            <Line type="monotone" dataKey="sellPrice" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
