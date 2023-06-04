const locations = document.getElementsByClassName("location");
const types = document.getElementsByClassName("type");
const locationButton = document.querySelector("#locationMain");
const typeButton = document.querySelector("#typeMain");
const callsList = document.querySelector("#calls");
const typeMainButton = document.querySelector("#typeMainButton");
const locationMainButton = document.querySelector("#locationMainButton");
const typeMain = document.querySelector("#typeMain");
const locationMain = document.querySelector("#locationMain");
const dateSelector = document.querySelector("#dateSelector");
const sortCategory = document.querySelector("#sortCategory");

const params = {
  location: "",
  type: "",
  sort: "",
  direction: "",
  dateStart: "",
  dateEnd: "",
  groupBy: "",
};

const urlParams = new URLSearchParams(window.location.search);

for (const [key, value] of urlParams) {
  params[key] = value;
}

function toggleOnLocationFilter(loc) {
  params["location"] = loc.innerHTML;
  setURL();
}

function toggleOnTypeFilter(type) {
  params["type"] = type.innerHTML;
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

function toggleOffLocationFilter() {
  params.location = "";
  setURL();
}

typeMainButton.addEventListener(
  "click",
  () => {
    params.type = "";
    setURL();
  },
  false
);

locationMainButton.addEventListener(
  "click",
  () => {
    params.location = "";
    setURL();
  },
  false
);

dateSelector.addEventListener(
  "click",
  () => {
    const daysAgo = dateSelector.value;
    setDateParams(daysAgo, -1);
    setURL();
  },
  false
);

for (let index = 0; index < types.length; index++) {
  if (params.type === "") {
    types[index].addEventListener(
      "click",
      () => toggleOnTypeFilter(types[index]),
      false
    );
  } else {
    types[index].parentElement.style.display = "none";
  }

  if (params.location === "") {
    locations[index].addEventListener(
      "click",
      () => toggleOnLocationFilter(locations[index]),
      false
    );
  } else {
    locations[index].parentElement.style.display = "none";
  }
}

typeMainButton.addEventListener(
  "click",
  () => {
    params.type = "";
    setURL();
  },
  false
);

locationMainButton.addEventListener(
  "click",
  () => {
    params.location = "";
    setURL();
  },
  false
);

if (params.type !== "") {
  typeMainButton.style.display = "inline";
  typeMain.style.display = "inline";
  typeMainButton.innerHTML = params.type + typeMainButton.innerHTML;
}

if (params.location !== "") {
  locationMainButton.style.display = "inline";
  locationMain.style.display = "inline";
  locationMainButton.innerHTML = params.location + locationMainButton.innerHTML;
}

sortCategory.addEventListener(
  "click",
  () => {
    handleSortChange();
  },
  false
);

function handleSortChange() {
  params.sort = sortCategory.value;
  params.direction = "dsc";

  if (params.sort === "recent") {
    params.sort = "datetime";
    params.direction = "dsc";
  }

  if (params.sort === "oldest") {
    params.sort = "datetime";
    params.direction = "asc";
  }

  setURL();
}
