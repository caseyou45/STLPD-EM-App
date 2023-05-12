import { ICall } from "../Models/Call";
import CallModel from "../Models/Call";
import { Request, Response } from "express";
import { ICreateCallInput } from "../Models/Call";
import { parseForDate } from "../Services/ParseQuery";

class Call {
  public static async getAll(req: Request, res: Response) {
    const calls = await CallModel.find({}).catch((error: Error) => {
      return res.json({ error: error });
    });
    return res.json({
      calls: calls,
    });
  }

  public static async getByDate(req: Request, res: Response) {
    let query = {};

    if (
      req.query.hasOwnProperty("dateStart") ||
      req.query.hasOwnProperty("dateEnd")
    ) {
      parseForDate(req, query);
    }

    const calls = await CallModel.find(query).catch((error: Error) => {
      return res.json({ error: error });
    });
    return res.json({
      calls: calls,
    });
  }

  public static async SaveCall({
    //
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
    }); //
  }
}
export default Call;
