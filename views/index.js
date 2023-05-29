const locations = document.getElementsByClassName("location");
const types = document.getElementsByClassName("type");
const locationButton = document.querySelector("#locationMain");
const typeButton = document.querySelector("#typeMain");
const callsList = document.querySelector("#calls");
const typeMainButton = document.querySelector("#typeMainButton");
const locationMainButton = document.querySelector("#locationMainButton");
const dateSelector = document.querySelector("#dateSelector");
const groupType = document.querySelector("#groupType");
const groupLocation = document.querySelector("#groupLocation");

const params = {
  location: "",
  type: "",
  sort: "",
  direction: "",
  dateStart: "",
  dateEnd: "",
  groupBy: "",
};

const baseURL = "/api/";

function toggleOnLocationFilter(loc) {
  params["location"] = loc.childNodes[0].innerHTML;
  locationMainButton.innerHTML = params["location"];
  setURL();
}

function toggleOnTypeFilter(type) {
  params["type"] = type.childNodes[0].innerHTML;
  setURL();
}

async function setURL() {
  let append = "?";
  for (let [key, value] of Object.entries(params)) {
    if (value) {
      //MongoDB no likey parenthesis. So we don't include them in the search. Nothing of value is lost.
      if (value.includes("(")) {
        let par = value.indexOf("(");
        value = value.slice(0, par);
      }
      append += key + "=" + encodeURI(value) + "&";
    }
  }

  if (append[append.length - 1] === "&") append = append.slice(0, -1);

  if (params.groupBy !== "") {
    window.location = "/group" + append;
  } else {
    window.location = "/" + append;
  }
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

function handleDateChange() {
  const daysAgo = dateSelector.value;
  setDateParams(daysAgo, -1);
  setURL();
}
typeMainButton.addEventListener("click", () => toggleOffTypeFilter(), false);

locationMainButton.addEventListener(
  "click",
  () => toggleOffLocationFilter(),
  false
);

dateSelector.addEventListener("click", () => handleDateChange(), false);

for (let index = 0; index < types.length; index++) {
  types[index].addEventListener(
    "click",
    () => toggleOnTypeFilter(types[index]),
    false
  );
  locations[index].addEventListener(
    "click",
    () => toggleOnLocationFilter(locations[index]),
    false
  );
}

groupType.addEventListener(
  "click",
  () => {
    console.log()
    params.groupBy = "type";
    setURL();
  },
  false
);
groupLocation.addEventListener(
  "click",
  () => {
    params.groupBy = "location";
    setURL();
  },
  false
);

const urlParams = new URLSearchParams(window.location.search);

for (const [key, value] of urlParams) {
  params[key] = value;
}
