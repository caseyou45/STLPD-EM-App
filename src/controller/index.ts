import { Request, Response } from "express";
import { ICallDTO } from "../models/call";
import getWithoutGrouping from "../services/call";

export default async function (req: Request, res: Response) {
  const calls: ICallDTO[] = await getWithoutGrouping(req, res);
  return res.render("index", { calls: calls });
}
