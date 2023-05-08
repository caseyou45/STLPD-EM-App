import * as mongoose from "mongoose";

export interface ICall {
  datetime: string;
  eventID: string;
  location: string;
  type: string;
}

const CallSchema = new mongoose.Schema({
  datetime: { type: String },
  eventID: { type: String },
  location: { type: String },
  type: { type: String },
});

const Call = mongoose.model<ICall>("Call", CallSchema);

export default Call;
