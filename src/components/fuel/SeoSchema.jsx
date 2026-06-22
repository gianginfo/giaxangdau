import React, { useEffect } from "react";
import { base44 } from "@/api/base44Client";

export default function SeoSchema() {
  useEffect(() => {
    async function injectSchema() {
      try {
        const prices = await base44.entities.FuelPrice.list("sort_order", 20);
        if (!prices.length) return;

        const itemList = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Giá xăng dầu Việt Nam hôm nay",
          "itemListElement": prices.map((p, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
              "@type": "Product",
              "name": p.name,
              "category": p.fuel_type === "gasoline" ? "Xăng" : p.fuel_type === "diesel" ? "Dầu Diesel" : "Dầu hỏa",
              "offers": {
                "@type": "Offer",
                "price": p.price_zone_1,
                "priceCurrency": "VND",
                "availability": "https://schema.org/InStock",
                "url": "https://fuel.vn",
              },
            },
          })),
        };

        let script = document.getElementById("fuel-price-jsonld");
        if (!script) {
          script = document.createElement("script");
          script.id = "fuel-price-jsonld";
          script.type = "application/ld+json";
          document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(itemList);
      } catch (e) {
        console.error(e);
      }
    }
    injectSchema();
    return () => {
      const script = document.getElementById("fuel-price-jsonld");
      if (script) script.remove();
    };
  }, []);

  return null;
}