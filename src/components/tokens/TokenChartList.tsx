"use client";
import { Tabs, Tab } from "@nextui-org/react";

import TokenChart from "./TokenChart";
import { Currency } from "@/types/token";

export default function TokenChartList() {
  const currencies = ["USDT", "BTC", "ETH"] as Currency[];
  return (
    <div>
      <Tabs aria-label="Options">
        {
          currencies.map((currency) => (
            <Tab key={currency} title={currency}>
              <TokenChart currency={currency} />
            </Tab>
          ))
        }
      </Tabs>
    </div>
  );
}
