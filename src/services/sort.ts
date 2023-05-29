import { Request, Response } from "express";
import { ICallDTO } from "../models/call";

function sortDTOsByCounts(calls: ICallDTO[], req: Request): ICallDTO[] {
  const sortProperty = req.query.sort as keyof ICallDTO | undefined;
  const direction = req.query.direction === "asc" ? 1 : -1;

  if (sortProperty !== undefined) {
    calls.sort(
      (a, b) => (Number(a[sortProperty]) - Number(b[sortProperty])) * direction
    );
  }

  return calls;
}

function getSortMethod(req: Request, sort: any) {
  Object.assign(sort, { datetime: -1 }); //sort by most recent by default
  if (req.query && req.query.sort && req.query.direction) {
    delete sort.datetime;
    const method: any = req.query.sort || null;
    const direction: any = req.query.direction === "asc" ? 1 : -1;
    Object.assign(sort, { [method]: direction });
  }
}

export { getSortMethod, sortDTOsByCounts };
