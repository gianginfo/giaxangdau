import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import GhostLine from "@/components/fuel/GhostLine";
import Header from "@/components/fuel/Header";
import HeroSection from "@/components/fuel/HeroSection";
import FuelSearch from "@/components/fuel/FuelSearch";
import PriceTrendChart from "@/components/fuel/PriceTrendChart";
import PriceTable from "@/components/fuel/PriceTable";
import NoticeSection from "@/components/fuel/NoticeSection";
import CommitmentSection from "@/components/fuel/CommitmentSection";
import SourcesSection from "@/components/fuel/SourcesSection";
import FooterSection from "@/components/fuel/FooterSection";

const HERO_IMAGE = "https://media.base44.com/images/public/6a396806623dcf432fdadf94/30b67f6e2_generated_fa13593e.png";
const DETAIL_IMAGE = "https://media.base44.com/images/public/6a396806623dcf432fdadf94/c9bf7f5e3_generated_a6c47e0b.png";

export default function Home() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPrices() {
      try {
        const data = await base44.entities.FuelPrice.list("sort_order", 10);
        setPrices(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadPrices();
  }, []);

  return (
    <div className="relative min-h-screen bg-obsidian overflow-hidden">
      <Header />
      <GhostLine />

      <HeroSection heroImage={HERO_IMAGE} />
      <FuelSearch />
      <PriceTrendChart />
      <PriceTable prices={prices} loading={loading} />
      <NoticeSection detailImage={DETAIL_IMAGE} />
      <CommitmentSection />
      <SourcesSection />
      <FooterSection />
    </div>
  );
}