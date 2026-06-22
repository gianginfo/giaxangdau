import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

function todayStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function inferFuelType(title) {
  const t = title.toLowerCase();
  if (t.includes('dầu hỏa') || t.includes('dầu ko') || t.includes('hỏa')) return 'kerosene';
  if (t.includes('do') || t.includes('diesel')) return 'diesel';
  return 'gasoline';
}

function matchName(apiName, fuelPriceName) {
  const a = apiName.toUpperCase().trim();
  const f = fuelPriceName.toUpperCase().trim();
  if (a === f) return true;
  const aNorm = a.replace(/^DO\s+/, 'DẦU DIESEL ');
  return aNorm === f;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const today = todayStr();

    // 1. Fetch today's prices from API
    const apiRes = await fetch(`https://giaxanghomnay.com/api/pvdate/${today}`);
    if (!apiRes.ok) throw new Error(`API trả về ${apiRes.status}`);
    const json = await apiRes.json();
    const items = Array.isArray(json) && Array.isArray(json[0]) ? json[0] : [];

    if (items.length === 0) {
      return Response.json({ message: 'Không có dữ liệu cho hôm nay', date: today });
    }

    // 2. Check if today's snapshot already exists in FuelPriceHistory
    const existing = await base44.asServiceRole.entities.FuelPriceHistory.filter(
      { snapshot_date: today },
      'snapshot_date',
      50
    );

    if (existing.length === 0) {
      // Store today's snapshot
      const historyRecords = items.map((item, index) => ({
        snapshot_date: today,
        name: item.title,
        fuel_type: inferFuelType(item.title),
        price_zone_1: item.zone1_price,
        price_zone_2: item.zone2_price,
        sort_order: index
      }));
      await base44.asServiceRole.entities.FuelPriceHistory.bulkCreate(historyRecords);
    }

    // 3. Update FuelPrice records with latest prices
    const fuelPrices = await base44.asServiceRole.entities.FuelPrice.list('sort_order', 20);
    for (const item of items) {
      const matched = fuelPrices.find(fp => matchName(item.title, fp.name));
      if (matched) {
        await base44.asServiceRole.entities.FuelPrice.update(matched.id, {
          price_zone_1: item.zone1_price,
          price_zone_2: item.zone2_price,
          effective_date: `${today}T15:00:00Z`,
          effective_time: '15:00'
        });
      }
    }

    return Response.json({
      message: 'Đồng bộ xong',
      date: today,
      items: items.length,
      historyStored: existing.length === 0
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});