import * as React from "react";

import { NextUIProvider } from "@nextui-org/react";

export const NextUIWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};
