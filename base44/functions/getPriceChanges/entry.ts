import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const date = body.date;

    const allRecords = await base44.asServiceRole.entities.FuelPriceHistory.list('snapshot_date', 5000);

    // Group by date
    const byDate = {};
    allRecords.forEach(r => {
      if (!byDate[r.snapshot_date]) byDate[r.snapshot_date] = [];
      byDate[r.snapshot_date].push(r);
    });

    const sortedDates = Object.keys(byDate).sort();

    if (sortedDates.length < 2) {
      return Response.json({ changes: {}, targetDate: sortedDates[sortedDates.length - 1] || null, previousDate: null });
    }

    let targetDate, previousDate;
    if (date) {
      targetDate = sortedDates.filter(d => d <= date).pop();
      if (targetDate) {
        previousDate = sortedDates.filter(d => d < targetDate).pop();
      }
    } else {
      targetDate = sortedDates[sortedDates.length - 1];
      previousDate = sortedDates[sortedDates.length - 2];
    }

    if (!targetDate || !previousDate) {
      return Response.json({ changes: {}, targetDate, previousDate });
    }

    const targetRecords = byDate[targetDate];
    const previousRecords = byDate[previousDate];

    const changes = {};
    targetRecords.forEach(r => {
      const prev = previousRecords.find(p => p.name === r.name);
      if (prev) {
        changes[r.name] = {
          change_zone_1: r.price_zone_1 - prev.price_zone_1,
          change_zone_2: r.price_zone_2 - prev.price_zone_2,
        };
      }
    });

    return Response.json({ changes, targetDate, previousDate });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});