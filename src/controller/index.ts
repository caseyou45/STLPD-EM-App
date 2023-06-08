import { NextFunction, Request, Response } from "express";
import { ICallDTO } from "../models/call";
import getWithoutGrouping from "../services/call";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const callsAsDTOs: any = await getWithoutGrouping(req, res);

    return res.render("index", {
      calls: callsAsDTOs,
      originalQuery: req.query,
    });
  } catch (error) {
    next(error);
  }
}
