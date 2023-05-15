import * as mongoose from "mongoose";

interface ICall {
  datetime: Date;
  eventID: string;
  location: string;
  type: string;
}

interface ICreateCallInput {
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

export { Call as default, ICreateCallInput, ICall };
