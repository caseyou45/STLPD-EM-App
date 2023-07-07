import * as mongoose from "mongoose";

interface ICall {
  datetime: Date;
  eventID: string;
  location: string;
  type: string;
  neighborhood: string;
}

interface ICallDTO {
  date: String;
  time: String;
  eventID: string;
  location: string;
  locationCount: number;
  type: string;
  typeCount: number;
  neighborhood: string;
  neighborhoodCount: number;
}

interface ICreateCallInput {
  datetime: ICall["datetime"];
  eventID: ICall["eventID"];
  location: ICall["location"];
  type: ICall["type"];
  neighborhood: ICall["neighborhood"];
}

const CallSchema = new mongoose.Schema({
  datetime: { type: Date },
  eventID: { type: String },
  location: { type: String },
  type: { type: String },
  neighborhood: { type: String },
});

const Call = mongoose.model<ICall>("Call", CallSchema);

export { Call as default, ICreateCallInput, ICall, ICallDTO };
