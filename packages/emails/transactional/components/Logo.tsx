import { Text } from "@react-email/components";
// biome-ignore lint/correctness/noUnusedImports: Need it for tsx execution
import React from "react";
import { brandName } from "../brand";

export const Logo = () => (
  <Text
    style={{
      margin: "24px 0 8px",
      fontSize: "28px",
      fontWeight: 800,
      letterSpacing: "-0.02em",
      color: "#1E40AF",
    }}
  >
    {brandName}
  </Text>
);
