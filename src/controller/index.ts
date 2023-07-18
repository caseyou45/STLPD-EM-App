import { NextFunction, Request, Response } from "express";
import getCallsByQuery from "../services/call";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const callsAsDTOs: any = await getCallsByQuery(req, res);

    return res.json(callsAsDTOs);
  } catch (error) {
    next(error);
  }
}
