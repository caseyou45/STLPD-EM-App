import { Request, Response } from "express";

export function parseForDate(req: Request, query: any) {
  let dateStart: any;
  let dateEnd: any;
  let datetime = {};
  query.datetime = {};

  if (req.query.hasOwnProperty("dateStart")) {
    dateStart = req.query.dateStart;
    dateStart = new Date(dateStart);
    Object.assign(datetime, { $gte: dateStart });
    Object.assign(query, { datetime: datetime });
  }

  if (req.query.hasOwnProperty("dateEnd")) {
    dateEnd = req.query.dateEnd;
    dateEnd = new Date(dateEnd);
    Object.assign(datetime, { $lt: dateEnd });
    Object.assign(query, { datetime: datetime });
  }
}
