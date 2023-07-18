import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";
import * as pdfjsLib from "pdfjs-dist";
import MonthCrimeSummaryModel from "../models/monthCrimeSummarySchema";
import { IMonthCrimeSummary } from "../models/monthCrimeSummarySchema";

let crimes = [
  "Murder and Nonnegligent Manslaughter",
  "Kidnapping/Abduction",
  "Aggravated Assault",
  "Simple Assault",
  "Intimidation",
  "Rape",
  "Sodomy",
  "Sexual Assault with an Object",
  "Fondling",
  "Robbery",
  "Carjacking",
  "Arson",
  "Burglary/Breaking and Entering",
  "Pocket-picking",
  "Purse-snatching",
  "Shoplifting",
  "Theft From Building",
  "Theft From Coin-Operated Machine or Device",
  "Theft From Motor Vehicle",
  "Theft From Motor Vehicle Parts/Accessories",
  "All Other Larceny",
  "Motor Vehicle Theft",
  "Counterfeiting/Forgery",
  "False Pretense/Swindle/Confidence Game",
  "Credit Card/Automatic Teller Machine Fraud",
  "Identity Theft",
  "Embezzlement",
  "Stolen Property Offenses",
  "Destruction/Damage/Vandalism of Property",
  "Drug/Narcotic Violations",
  "Drug Equipment Violations",
  "Weapons Law Violations",
  "Disorderly Conduct",
  "Family Offenses, Nonviolent",
  "Trespass of Real Property",
  "All Other Offenses",
];
interface PDF {
  fileURL: string;
  fileName: string;
}

async function fetchHTMLContent(url: string): Promise<string> {
  try {
    const response = await axios.get<string>(url);
    return response.data;
  } catch (error) {
    throw new Error(`Fetch Error: ${error}`);
  }
}

export default async function go() {
  const pdfDataArray: PDF[] = [];
  const page: string = await fetchHTMLContent(
    "https://www.slmpd.org/crime_stats.shtml"
  );

  const $ = cheerio.load(page);

  const firstTable = $("table").first();

  const tbody = firstTable.find("tbody").eq(1);

  const tr = tbody.find("tr").first();

  if (tr.text().trim().includes("Neighborhood")) {
    tbody.find("a").each((index, element) => {
      const href: string | any = $(element).attr("href");
      const pdfData: PDF = {
        fileURL: "https://www.slmpd.org/" + href,
        fileName: href,
      };
      pdfDataArray.push(pdfData);
    });
  }

  for (const pdfData of pdfDataArray) {
    const pdfAsTextArray: string[] = await readPdfFromUrl(pdfData);
    const crimeSummaries: IMonthCrimeSummary[] =
      await transformTextToIMonthCrimeSummary(pdfAsTextArray, pdfData);
    crimeSummeriesToMongoDB(crimeSummaries);
  }
}

async function crimeSummeriesToMongoDB(crimeSummaries: IMonthCrimeSummary[]) {
  const alreadyExists = await isCrimeSummaryExists(crimeSummaries[0].fileName);
  if (!alreadyExists) {
    for (const crimeSummary of crimeSummaries) {
      saveMonthCrimeSummary(crimeSummary);
    }
    console.log("Finished " + crimeSummaries[0].fileName);
  }
}
async function readPdfFromUrl(pdf: PDF): Promise<string[]> {
  const response = await fetch(pdf.fileURL);
  const arrayBuffer = await response.arrayBuffer();
  const pdfFile = await pdfjsLib.getDocument(arrayBuffer).promise;
  const numPages = pdfFile.numPages;
  const pdfText: string[] = [];

  for (let i = 1; i <= numPages; i++) {
    const page = await pdfFile.getPage(i);
    const content: any = await page.getTextContent();

    for (const stringFromPage of content.items) {
      if (stringFromPage.str != " " && stringFromPage.str != "' '")
        pdfText.push(stringFromPage.str);
    }
  }

  return pdfText;
}

async function transformTextToIMonthCrimeSummary(
  pdfText: any,
  pdf: PDF
): Promise<IMonthCrimeSummary[]> {
  let index = 0;
  let category = "";
  let neighborhood = "";
  let month = "";
  let runDate = null;
  const monthReports: IMonthCrimeSummary[] = [];

  const parseMonth = (element: string): string => {
    return element.split(" ")[0].trim();
  };

  const parseRunDate = (element: string): Date => {
    return new Date(element.slice(element.indexOf(":") + 1, element.length));
  };

  while (index < pdfText.length) {
    let element = pdfText[index];

    switch (true) {
      case element.includes("MONTHLY") && month === "":
        month = parseMonth(element);
        break;
      case element.includes("Run Date") && runDate === null:
        runDate = parseRunDate(element);
        break;
      case element === "Neighborhood":
        index++;
        neighborhood = pdfText[index];
        break;
      case element === "Person":
        category = "Person";
        break;
      case element === "Property":
        category = "Property";
        break;
      case element === "Society":
        category = "Society";
        break;
      case element === "Unspecified":
        category = "Unspecified";
        break;
      default:
        break;
    }

    if (crimes.includes(pdfText[index])) {
      const crimeData: IMonthCrimeSummary = {
        month: month,
        runDate: runDate,
        neighborhood: neighborhood,
        category: category,
        crime: pdfText[index],
        nibrs: pdfText[index + 1],
        total2023: parseInt(pdfText[index + 2]),
        total2022: parseInt(pdfText[index + 3]),
        diff: parseInt(pdfText[index + 4]),
        change: 0,
        ytd: 0,
        fileName: pdf.fileName,
        fileURL: pdf.fileURL,
      };

      if (pdfText.length >= 6 && pdfText[index + 5].endsWith("%")) {
        crimeData.change = parseInt(pdfText[index + 5].replace("%", ""));
        crimeData.ytd = parseInt(pdfText[index + 6]);
        index += 6;
      } else {
        crimeData.ytd = parseInt(pdfText[index + 5]);
        index += 5;
      }

      if (!isNaN(crimeData.ytd)) {
        monthReports.push(crimeData);
      }
    }

    index++;
  }

  return monthReports;
}

async function saveMonthCrimeSummary(
  monthCrimeSummary: IMonthCrimeSummary
): Promise<void> {
  MonthCrimeSummaryModel.create(monthCrimeSummary).catch((error: Error) => {
    console.log(monthCrimeSummary);
  });
}

async function isCrimeSummaryExists(fileName: string): Promise<boolean> {
  try {
    const existingSummary = await MonthCrimeSummaryModel.findOne({
      fileName: fileName,
    });
    return !!existingSummary;
  } catch (error) {
    throw error;
  }
}
