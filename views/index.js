const locations = document.getElementsByClassName("location");
const types = document.getElementsByClassName("type");
const locationButton = document.getElementById("locationMain");
const typeButton = document.getElementById("typeMain");
const callsList = document.getElementById("calls");
const typeMainButton = document.getElementById("typeMainButton");
const locationMainButton = document.getElementById("locationMainButton");

const params = {
  location: "",
  type: "",
  sort: "",
  direction: "",
  dateStart: "",
  dateEnd: "",
};

let baseURL = "/api/";

function toggleOnLocationFilter(loc) {
  params["location"] = loc.childNodes[0].innerHTML;
  locationMainButton.style.display = "block";
  locationMainButton.innerHTML = params["location"];
  setURL();
}

function toggleOnTypeFilter(type) {
  params["type"] = type.childNodes[0].innerHTML;
  typeMainButton.style.display = "block";
  typeMainButton.innerHTML = params["type"];
  setURL();
}

async function setURL() {
  let apppend = "?";
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      apppend += key + "=" + encodeURI(value) + "&";
    }
  }

  if (apppend[apppend.length - 1] === "&") apppend = apppend.slice(0, -1);

  getCalls(apppend);
}

function setSingleDateWithOffset(offset) {
  let todayDate = new Date();
  todayDate.setMinutes(todayDate.getMinutes() - todayDate.getTimezoneOffset());
  let result = todayDate.setDate(todayDate.getDate() - offset);
  let dayString = new Date(result).toISOString().slice(0, 10);
  return dayString;
}

function setDateParams(start, end) {
  params.dateStart = setSingleDateWithOffset(start);
  params.dateEnd = setSingleDateWithOffset(end);
}
async function getCalls(paramURL) {
  console.log(baseURL + paramURL);
  const response = await fetch(baseURL + paramURL);
  const data = await response.json();
  callsList.innerHTML = "";
  data.forEach((element) => {
    let div = document.createElement("div");
    div.innerHTML =
      "<div class='card'>" +
      element.datetime +
      "<div class='type'><span>" +
      element.type +
      "</span><span>" +
      element.typeCount +
      "</span>" +
      "</div>" +
      "<div class='location'><span>" +
      element.location +
      "</span><span>" +
      element.locationCount +
      "</span>" +
      "</div>";

    const location = div.getElementsByClassName("location")[0];
    location.addEventListener(
      "click",
      () => toggleOnLocationFilter(location),
      false
    );

    const type = div.getElementsByClassName("type")[0];
    type.addEventListener("click", () => toggleOnTypeFilter(type), false);

    callsList.append(div);
  });
}

function toggleOffTypeFilter() {
  params.type = "";
  typeMainButton.style.display = "none";
  setURL();
}

function toggleOffLocationFilter() {
  params.location = "";
  locationMainButton.style.display = "none";
  setURL();
}

typeMainButton.addEventListener("click", () => toggleOffTypeFilter(), false);
locationMainButton.addEventListener(
  "click",
  () => toggleOffLocationFilter(),
  false
);

setDateParams(1, -1);
setURL();
