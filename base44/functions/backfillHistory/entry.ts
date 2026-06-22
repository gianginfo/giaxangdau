import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

function inferFuelType(title) {
  const t = title.toLowerCase();
  if (t.includes('dầu hỏa') || t.includes('dầu ko') || t.includes('hỏa')) return 'kerosene';
  if (t.includes('do') || t.includes('diesel')) return 'diesel';
  return 'gasoline';
}

function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const startDate = body.start_date;
    const endDate = body.end_date;

    if (!startDate || !endDate) {
      return Response.json({ error: 'Thiếu start_date hoặc end_date' }, { status: 400 });
    }

    // Build list of dates
    const dates = [];
    const start = new Date(startDate + 'T00:00:00');
    const end = new Date(endDate + 'T00:00:00');
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(formatDate(d));
    }

    // Fetch all existing snapshot dates ONCE (paginated)
    const existingDates = new Set();
    let skip = 0;
    let hasMore = true;
    while (hasMore) {
      const batch = await base44.asServiceRole.entities.FuelPriceHistory.list('snapshot_date', 500, skip);
      for (const r of batch) existingDates.add(r.snapshot_date);
      hasMore = batch.length === 500;
      skip += 500;
    }

    const results = { total: dates.length, created: 0, skipped: 0, failed: 0, errors: [] };

    for (const date of dates) {
      try {
        if (existingDates.has(date)) {
          results.skipped++;
          continue;
        }

        // Fetch from API with retry on 429
        let apiRes;
        for (let attempt = 0; attempt < 4; attempt++) {
          apiRes = await fetch(`https://giaxanghomnay.com/api/pvdate/${date}`);
          if (apiRes.ok || apiRes.status !== 429) break;
          await new Promise(resolve => setTimeout(resolve, 3000 * (attempt + 1)));
        }
        if (!apiRes.ok) {
          results.failed++;
          results.errors.push(`${date}: API ${apiRes.status}`);
          continue;
        }
        const json = await apiRes.json();
        const items = Array.isArray(json) && Array.isArray(json[0]) ? json[0] : [];

        if (items.length === 0) {
          results.failed++;
          results.errors.push(`${date}: no data`);
          continue;
        }

        // Create history records
        const historyRecords = items.map((item, index) => ({
          snapshot_date: date,
          name: item.title,
          fuel_type: inferFuelType(item.title),
          price_zone_1: item.zone1_price,
          price_zone_2: item.zone2_price,
          sort_order: index
        }));
        await base44.asServiceRole.entities.FuelPriceHistory.bulkCreate(historyRecords);
        results.created++;

        // Delay to avoid API rate limiting
        await new Promise(resolve => setTimeout(resolve, 1200));
      } catch (e) {
        results.failed++;
        results.errors.push(`${date}: ${e.message}`);
      }
    }

    return Response.json(results);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});