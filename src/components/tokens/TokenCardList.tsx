import NextImage from "next/image";
import { Card, CardBody, Image } from "@nextui-org/react";

import { getCurrentPrices } from "@/services/token.service";

export default async function TokenCardList() {
  const tokenPrice = await getCurrentPrices();

  return (
    <div className="flex space-x-2 cursor-default">
      {tokenPrice.map((token) => (
        <Card key={token.label} fullWidth={true}>
          <CardBody>
            <div className="flex space-x-2 items-center">
              <Image
                as={NextImage}
                width={50}
                height={50}
                src={`/token/${token.label}.png`}
                alt={token.label}
              />
              <div>
                <p className="text-lg font-semibold">{token.label}</p>
                <span className="flex space-x-2 items-center">
                  <p className="text-2xl font-light">
                    {token.lastest_price.toLocaleString()}
                  </p>
                  <p className="text-xs">(฿/token)</p>
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
