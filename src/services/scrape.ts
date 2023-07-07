import * as cheerio from "cheerio";
import axios from "axios";
import dotenv from "dotenv";
import { saveCall } from "./call";
import withStreetNameFindNeighborhood from "./neighborhood";

dotenv.config();

async function fetchPage(): Promise<string> {
  const data = await axios.get(`${process.env.PD_URL}`).then((res) => {
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

    const datetime: Date = new Date($(tableCol[0]).text());
    const eventID: string = $(tableCol[1]).text();
    const location: string = $(tableCol[2]).text();
    const type: string = $(tableCol[3]).text();

    const neighborhood: string = await withStreetNameFindNeighborhood(location);
    await saveCall({
      datetime,
      eventID,
      location,
      type,
      neighborhood,
    });
  }
}

async function startCallRecording() {
  setInterval(() => {
    convertResponseDateToDom();
  }, 60000);
}

export default startCallRecording;
