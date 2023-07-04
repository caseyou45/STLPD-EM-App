import * as cheerio from "cheerio";

export default async function searchAddress(address: string): Promise<string> {
  const formData = new URLSearchParams();
  formData.append("streetAddress", address);
  formData.append("RealEstatePropertyInfor", "RealEstatePropertyInfor");
  formData.append("BoundaryGeography", "BoundaryGeography");
  formData.append("TrashMaintenance", "TrashMaintenance");
  formData.append("findByAddress", "Find+address");

  try {
    const response = await fetch(
      "https://www.stlouis-mo.gov/data/address-Search/?",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.text();

    const $ = cheerio.load(data);

    const neighborhoodTh = $('th:contains("Neighborhood")');

    const tdTag = neighborhoodTh.next();

    const neighborhood = tdTag.find("a").text();

    if (neighborhood) {
      return neighborhood.trim();
    }

    return "";
  } catch (error) {
    console.error(error);
    return "Error: Failed to parse HTML";
  }
}
