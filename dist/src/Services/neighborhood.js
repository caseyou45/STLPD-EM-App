"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
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
function withStreetNameFindNeighborhood(address) {
    return __awaiter(this, void 0, void 0, function* () {
        if (address.includes("/")) {
            const coordinates = yield getCoordinates(address);
            const result = yield getNeighborhoodWithCoordinates(coordinates);
            return result;
        }
        else {
            return yield getNeighborhood(address);
        }
    });
}
exports.default = withStreetNameFindNeighborhood;
function makeRequest(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(url);
            return response.data.features;
        }
        catch (error) {
            console.log(error.message);
            return [];
        }
    });
}
function getCoordinates(address) {
    return __awaiter(this, void 0, void 0, function* () {
        let coords = [];
        const apiUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places";
        const accessToken = process.env.MAPBOX_TOKEN;
        const encodedAddress = encodeURIComponent(address + " ST LOUIS, MO");
        const requestUrl = `${apiUrl}/${encodedAddress}.json?access_token=${accessToken}`;
        const features = yield makeRequest(requestUrl);
        if (features.length > 0) {
            coords = features[0].center;
        }
        return coords;
    });
}
function getNeighborhoodWithCoordinates(coordinates) {
    return __awaiter(this, void 0, void 0, function* () {
        let neighborhood = "";
        const apiUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places";
        const accessToken = process.env.MAPBOX_TOKEN;
        const requestUrl = `${apiUrl}/${coordinates[0]},${coordinates[1]}.json?access_token=${accessToken}`;
        const features = yield makeRequest(requestUrl);
        if (features.length > 0) {
            const context = features[0].context;
            neighborhood = context[0].text;
        }
        return neighborhood;
    });
}
function getNeighborhood(address) {
    return __awaiter(this, void 0, void 0, function* () {
        address = address.replace(/X/g, "0");
        address += " ST LOUIS, MO ";
        let neighborhood = "";
        const apiUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places";
        const accessToken = process.env.MAPBOX_TOKEN;
        const encodedAddress = encodeURIComponent(address);
        const requestUrl = `${apiUrl}/${encodedAddress}.json?access_token=${accessToken}`;
        const features = yield makeRequest(requestUrl);
        if (features.length > 0) {
            const context = features[0].context;
            neighborhood = context[0].text;
        }
        return neighborhood;
    });
}
