import { ICall, ICallDTO } from "../../models/call";
import CallModel from "../../models/call";
import { Request, Response } from "express";
import { ICreateCallInput } from "../../models/call";
import { parseQueryFromURL, getSortMethod } from "../../services/parse";

export default async function getByURLQuery(
  req: Request,
  res: Response
): Promise<any> {
  const query: any = {};
  const sort: any = {};

  getSortMethod(req, sort);
  parseQueryFromURL(req, query);

  const calls: ICall[] | any = await CallModel.find(query)
    .sort(sort)
    .catch((error: Error) => {
      return error;
    });

  let callsAsDTOs = createDTOs(calls);
  res.json(callsAsDTOs);
}

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

function createDTOs(calls: ICall[]): ICallDTO[] {
  const dtos: ICallDTO[] = [];

  calls = calls || [];

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

export async function saveCall({
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
