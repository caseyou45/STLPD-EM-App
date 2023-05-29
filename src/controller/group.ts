import { Request, Response } from "express";
import { ICallDTO } from "../models/call";
import getWithoutGrouping from "../services/call";

export default async function (req: Request, res: Response) {
  const calls: ICallDTO[] = await getWithoutGrouping(req, res);

  const groupedCalls: any = [];

  const groupChoice: keyof ICallDTO = req.query.groupBy as keyof ICallDTO;

  const result = calls.map((call) => call[groupChoice]);

  const keys = [...new Set(result)];

  for (const key of keys) {
    groupedCalls.push({
      groupBy: groupChoice,
      groupKey: key,
      calls: calls.filter((call) => call[groupChoice] == key),
    });
  }

  return res.render("group", { calls: groupedCalls });
}
