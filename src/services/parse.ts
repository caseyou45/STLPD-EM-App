import { Request } from "express";

function parseQueryFromURL(req: Request, query: any) {
  if (req.query && (req.query.startDate || req.query.dateEnd)) {
    Object.assign(query, { datetime: {} });

    if (req.query.dateStart) {
      const ds: any = req.query.dateStart;
      const dateStart = new Date(ds);
      dateStart.setDate(dateStart.getDate() - 1);
      Object.assign(query.datetime, { $gte: dateStart });
    }

    if (req.query.dateEnd) {
      const de: any = req.query.dateEnd;
      const dateEnd = new Date(de);
      dateEnd.setDate(dateEnd.getDate() + 1);
      Object.assign(query.datetime, { $lt: new Date(dateEnd) });
    }

    //By default, just get the past days worth of calls
  } else if (req.query && !req.query.startDate && !req.query.dateEnd) {
    const dateStart = new Date();
    dateStart.setDate(dateStart.getDate() - 1);

    const dateEnd = new Date();
    dateEnd.setDate(dateEnd.getDate() + 1);

    Object.assign(query, {
      datetime: {
        $gte: dateStart,
        $lt: dateEnd,
      },
    });
  }

  if (req.query && req.query.type) {
    Object.assign(query, { type: { $regex: req.query.type, $options: "i" } });
  }

  if (req.query && req.query.location) {
    Object.assign(query, {
      location: { $regex: req.query.location, $options: "i" },
    });
  }
}

export { parseQueryFromURL };
