import { ICall } from "../../models/call";
import CallModel from "../../models/call";
import { Request, Response } from "express";
import { ICreateCallInput } from "../../models/call";
import parseQueryFromURL from "../../services/parse";

// async function getAll(req: Request, res: Response) {
//   const calls = await CallModel.find({}).catch((error: Error) => {
//     return res.json({ error: error });
//   });
//   return res.json({
//     calls: calls,
//   });
// }

async function getAll(req: Request, res: Response): Promise<ICall[] | Error> {
  const calls = await CallModel.find({}).catch((error: Error) => {
    return error;
  });
  return calls;
}

async function getByURLQuery(
  req: Request,
  res: Response
): Promise<ICall[] | Error> {
  const query: any = {};

  parseQueryFromURL(req, query);

  const calls = await CallModel.find(query).catch((error: Error) => {
    return error;
  });
  return calls;
}

async function saveCall({
  datetime,
  eventID,
  location,
  type,
}: ICreateCallInput): Promise<ICall[] | void> {
  CallModel.findOne({ eventID: eventID }).then((res) => {
    if (!res) {
      CallModel.create({
        datetime,
        eventID,
        location,
        type,
      }).catch((error: Error) => {
        throw error;
      });
    }
  });
}

export { saveCall, getAll, getByURLQuery };
