import { ICall } from "../Models/Call";
import Call from "../Models/Call";

interface ICreateCallInput {
  datetime: ICall["datetime"];
  eventID: ICall["eventID"];
  location: ICall["location"];
  type: ICall["type"];
}

async function SaveCall({
  datetime,
  eventID,
  location,
  type,
}: ICreateCallInput): Promise<ICall[] | void> {
  Call.findOne({ eventID: eventID }).then((res) => {
    if (!res) {
      Call.create({
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

async function GetAll(): Promise<ICall[] | void> {
  const calls = await Call.find({}).catch((error: Error) => {
    throw error;
  });

  return calls;
}

export default { SaveCall, GetAll };
