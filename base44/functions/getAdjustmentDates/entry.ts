import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Fetch all history records in one call (skip/limit pagination is unstable
    // when sorting by the non-unique snapshot_date field — records get skipped/duplicated)
    let allRecords = await base44.asServiceRole.entities.FuelPriceHistory.filter({}, null, 10000);

    // Group by date: { date: { fuelName: { price_zone_1, price_zone_2 } } }
    const byDate = {};
    for (const r of allRecords) {
      if (!byDate[r.snapshot_date]) byDate[r.snapshot_date] = {};
      byDate[r.snapshot_date][r.name] = {
        price_zone_1: r.price_zone_1,
        price_zone_2: r.price_zone_2,
        count: (byDate[r.snapshot_date][r.name]?.count || 0) + 1
      };
    }

    // Sort dates and compare consecutive dates
    const sortedDates = Object.keys(byDate).sort();
    const adjustmentDates = {};

    for (let i = 0; i < sortedDates.length; i++) {
      const date = sortedDates[i];
      const current = byDate[date];

      if (i === 0) {
        // First date is always an adjustment (baseline)
        adjustmentDates[date] = Object.values(current).reduce((sum, f) => sum + (f.count || 1), 0);
        continue;
      }

      const prev = byDate[sortedDates[i - 1]];
      let changed = false;

      // Compare each fuel's prices with previous date
      for (const [name, prices] of Object.entries(current)) {
        const prevPrices = prev[name];
        if (!prevPrices) {
          changed = true;
          break;
        }
        if (prices.price_zone_1 !== prevPrices.price_zone_1 || prices.price_zone_2 !== prevPrices.price_zone_2) {
          changed = true;
          break;
        }
      }

      // Also check if any fuel was removed
      if (!changed) {
        for (const name of Object.keys(prev)) {
          if (!current[name]) {
            changed = true;
            break;
          }
        }
      }

      if (changed) {
        adjustmentDates[date] = Object.values(current).reduce((sum, f) => sum + (f.count || 1), 0);
      }
    }

    return Response.json({
      adjustmentDates,
      totalDates: sortedDates.length,
      adjustmentCount: Object.keys(adjustmentDates).length
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});