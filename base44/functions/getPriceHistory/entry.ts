import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const months = body.months || 6;
    const zone = body.zone || 1;
    const priceKey = zone === 2 ? 'price_zone_2' : 'price_zone_1';

    // Calculate start date
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);
    const startDateStr = startDate.toISOString().split('T')[0];

    // Fetch all history records (sorted by date ascending)
    const allRecords = await base44.asServiceRole.entities.FuelPriceHistory.list('snapshot_date', 5000);

    // Filter by date range
    const filtered = allRecords.filter(r => r.snapshot_date >= startDateStr);

    // Group by date and pivot
    const byDate = {};
    const sortOrders = {};

    filtered.forEach(r => {
      const date = r.snapshot_date;
      if (!byDate[date]) byDate[date] = { date };
      byDate[date][r.name] = r[priceKey];
      if (sortOrders[r.name] === undefined) sortOrders[r.name] = r.sort_order;
    });

    const data = Object.keys(byDate).sort().map(d => byDate[d]);
    const fuelNames = Object.entries(sortOrders)
      .sort((a, b) => a[1] - b[1])
      .map(([name]) => name);

    return Response.json({ data, fuelNames });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});