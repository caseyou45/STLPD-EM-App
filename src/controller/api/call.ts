import { ICall, ICallDTO } from "../../models/call";
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

async function getAll(): Promise<ICall[] | Error> {
  const calls = await CallModel.find({}).catch((error: Error) => {
    return error;
  });
  return calls;
}

async function getByURLQuery(
  req: Request,
  res: Response
): Promise<ICallDTO[] | Error> {
  const query: any = {};

  parseQueryFromURL(req, query);

  const calls: ICall[] | any = await CallModel.find(query).catch(
    (error: Error) => {
      return error;
    }
  );

  const callsAsDTOs = createDTOs(calls);

  return callsAsDTOs;
}

function createDTOs(calls: ICall[]): any {
  const dtos: ICallDTO[] = [];

  calls.forEach((call: ICall) => {
    let dto: ICallDTO = {
      datetime: call.datetime,
      eventID: call.eventID,
      location: call.location,
      locationCount: calls.filter(
        (obj: ICall) => obj.location === call.location
      ).length,
      type: call.type,
      typeCount: calls.filter((obj: ICall) => obj.type === call.type).length,
    };

    dtos.push(dto);
  });

  return dtos;
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
