import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const stLouisNeighborhoods = [
  "Academy Neighborhood",
  "Baden Neighborhood",
  "Benton Park Neighborhood",
  "Benton Park West Neighborhood",
  "Bevo Mill Neighborhood",
  "Botanical Heights Neighborhood",
  "Boulevard Heights Neighborhood",
  "Carondelet Neighborhood",
  "Carr Square",
  "Central West End",
  "Cheltenham",
  "Clayton-Tamm",
  "Clifton Heights",
  "College Hill",
  "Columbus Square",
  "Compton Heights",
  "Covenant Blu Grand Center",
  "DeBaliviere Place",
  "Downtown",
  "Downtown West",
  "Dutchtown",
  "Ellendale",
  "Fairground",
  "Forest Park Southeast",
  "Fountain Park",
  "Fox Park",
  "Franz Park",
  "Gravois Park",
  "Hamilton Heights",
  "Hi Pointe",
  "Holly Hills",
  "Hyde Park",
  "Jeff-Vander-Lou",
  "Kings Oak",
  "Kingsway East",
  "Kingsway West",
  "Kosciusko",
  "Lafayette Square",
  "LaSalle Park",
  "Lewis Place",
  "Lindenwood Park",
  "Marine Villa",
  "Mark Twain",
  "Mark Twain I-70 Industrial",
  "McKinley Heights",
  "Midtown",
  "Mount Pleasant",
  "Near North Riverfront",
  "North Hampton",
  "North Pointe",
  "North Riverfront",
  "O'Fallon Neighborhood",
  "Old North St. Louis Neighborhood",
  "Patch Neighborhood",
  "Peabody Darst Webbe Neighborhood",
  "Penrose Neighborhood",
  "Princeton Heights Neighborhood",
  "Riverview Neighborhood",
  "Shaw Neighborhood",
  "Skinker DeBaliviere Neighborhood",
  "Soulard Neighborhood",
  "Southampton Neighborhood",
  "Southwest Garden Neighborhood",
  "St. Louis Hills Neighborhood",
  "St. Louis Place Neighborhood",
  "The Gate District Neighborhood",
  "The Greater Ville Neighborhood",
  "The Hill Neighborhood",
  "The Ville Neighborhood",
  "Tiffany Neighborhood",
  "Tower Grove East Neighborhood",
  "Tower Grove South Neighborhood",
  "Vandeventer Neighborhood",
  "Visitation Park Neighborhood",
  "Walnut Park East Neighborhood",
  "Walnut Park West Neighborhood",
  "Wells Goodfellow Neighborhood",
  "West End Neighborhood",
  "Wydown Skinker Neighborhood",
];

interface Coordinates {
  [index: number]: number;
}

interface Feature {
  center: Coordinates;
  context: { text: string }[];
}
export default async function withStreetNameFindNeighborhood(
  address: string
): Promise<string> {
  if (address.includes("/")) {
    const coordinates = await getCoordinates(address);
    const result = await getNeighborhoodWithCoordinates(coordinates);
    return result;
  } else {
    return await getNeighborhood(address);
  }
}

async function makeRequest(url: string): Promise<Feature[]> {
  try {
    const response = await axios.get(url);
    return response.data.features;
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
}

async function getCoordinates(address: string): Promise<Coordinates> {
  let coords: Coordinates = [];
  const apiUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places";
  const accessToken = process.env.MAPBOX_TOKEN as string;
  const encodedAddress = encodeURIComponent(address + " ST LOUIS, MO");
  const requestUrl = `${apiUrl}/${encodedAddress}.json?access_token=${accessToken}`;

  const features = await makeRequest(requestUrl);
  if (features.length > 0) {
    coords = features[0].center;
  }

  return coords;
}

async function getNeighborhoodWithCoordinates(
  coordinates: Coordinates
): Promise<string> {
  let neighborhood = "";
  const apiUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places";
  const accessToken = process.env.MAPBOX_TOKEN as string;
  const requestUrl = `${apiUrl}/${coordinates[0]},${coordinates[1]}.json?access_token=${accessToken}`;

  const features = await makeRequest(requestUrl);
  if (features.length > 0) {
    const context = features[0].context;
    neighborhood = context[0].text;
  }

  return neighborhood;
}

async function getNeighborhood(address: string): Promise<string> {
  address = address.replace(/X/g, "0");
  address += " ST LOUIS, MO ";

  let neighborhood = "";
  const apiUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places";
  const accessToken = process.env.MAPBOX_TOKEN as string;
  const encodedAddress = encodeURIComponent(address);
  const requestUrl = `${apiUrl}/${encodedAddress}.json?access_token=${accessToken}`;

  const features = await makeRequest(requestUrl);
  if (features.length > 0) {
    const context = features[0].context;
    neighborhood = context[0].text;
  }

  return neighborhood;
}
