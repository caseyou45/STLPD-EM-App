import { Request, Response } from "express";

function parseQueryFromURL(req: Request, query: any) {
  if (req.query.startDate || req.query.dateEnd) {
    Object.assign(query, { datetime: {} });

    if (req.query.dateStart) {
      const dateStart: any = req.query.dateStart;
      Object.assign(query.datetime, { $gte: new Date(dateStart) });
    }

    if (req.query.dateEnd) {
      const dateEnd: any = req.query.dateEnd;
      Object.assign(query.datetime, { $lt: new Date(dateEnd) });
    }
  }

  if (req.query.type) {
    Object.assign(query, { type: { $regex: req.query.type, $options: "i" } });
  }

  if (req.query.location) {
    Object.assign(query, {
      location: { $regex: req.query.location, $options: "i" },
    });
  }
}

export default parseQueryFromURL;
