import React from "react";
import { Fuel, Droplets, Flame } from "lucide-react";

export default function FuelIcon({ type }) {
  const iconClass = "w-5 h-5";
  
  switch (type) {
    case "gasoline":
      return <Fuel className={iconClass} />;
    case "diesel":
      return <Droplets className={iconClass} />;
    case "kerosene":
      return <Flame className={iconClass} />;
    default:
      return <Fuel className={iconClass} />;
  }
}