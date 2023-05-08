import * as cheerio from "cheerio";
import axios from "axios";
import dotenv from "dotenv";
import CallController from "../Controller/Call.Controller";
import Call, { ICall } from "../Models/Call";

dotenv.config();

function fetchPage(): Promise<string> {
  const data = axios.get(`${process.env.PD_URL}`).then((res) => {
    return res.data;
  });

  return data;
}

async function convertResponseDateToDom() {
  const page: string = await fetchPage();
  const $ = cheerio.load(page);
  const tableRows = $("tr");

  for (const row of tableRows) {
    const tableCol = $(row).find("td");

    const datetime: string = $(tableCol[0]).text();
    const eventID: string = $(tableCol[1]).text();
    const location: string = $(tableCol[2]).text();
    const type: string = $(tableCol[3]).text();

    await CallController.SaveCall({
      datetime,
      eventID,
      location,
      type,
    });
  }
}

export async function startCallRecording() {
  fetchPage();
  convertResponseDateToDom();
}
