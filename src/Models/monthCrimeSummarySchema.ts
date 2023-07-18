import * as mongoose from "mongoose";

interface IMonthCrimeSummary {
  month: string;
  runDate: Date | null;
  neighborhood: string;
  category: string;
  crime: string;
  nibrs: string;
  total2023: number;
  total2022: number;
  diff: number;
  change: number;
  ytd: number;
  fileName: string;
  fileURL: string;
}

const MonthCrimeSummarySchema = new mongoose.Schema({
  month: { type: String },
  runDate: { type: Date },
  neighborhood: { type: String },
  category: { type: String },
  crime: { type: String },
  nibrs: { type: String },
  total2023: { type: Number },
  total2022: { type: Number },
  diff: { type: Number },
  change: { type: Number },
  ytd: { type: Number },
  fileName: { type: String },
  fileURL: { type: String },
});

const MonthCrimeSummary = mongoose.model<IMonthCrimeSummary>(
  "MonthCrimeSummary",
  MonthCrimeSummarySchema
);

export { MonthCrimeSummary as default, IMonthCrimeSummary };
