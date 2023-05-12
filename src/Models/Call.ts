import * as mongoose from "mongoose";

export interface ICall {
  datetime: Date;
  eventID: string;
  location: string;
  type: string;
}

export interface ICreateCallInput {
  datetime: ICall["datetime"];
  eventID: ICall["eventID"];
  location: ICall["location"];
  type: ICall["type"];
}

const CallSchema = new mongoose.Schema({
  datetime: { type: Date },
  eventID: { type: String },
  location: { type: String },
  type: { type: String },
});

const Call = mongoose.model<ICall>("Call", CallSchema);

export default Call;
