const locations = document.getElementsByClassName("location");
const types = document.getElementsByClassName("type");
const typeMainButton = document.querySelector("#typeMainButton");
const locationMainButton = document.querySelector("#locationMainButton");
const typeMain = document.querySelector("#typeMain");
const locationMain = document.querySelector("#locationMain");
const sortCategory = document.querySelector("#sortCategory");
const dateStart = document.querySelector("#dateStart");
const dateEnd = document.querySelector("#dateEnd");
const dateSet = document.querySelector("#dateSet");
const sortSet = document.querySelector("#sortSet");
const sortDirection = document.querySelector("#sortDirection");
const clear = document.querySelector("#clear");

const params = {
  location: "",
  type: "",
  sort: "",
  direction: "",
  dateStart: "",
  dateEnd: "",
};

function handleDirectionButton() {
  if (params.direction === "" || params.direction === "asc") {
    params.direction = "dsc";
    sortDirection.innerHTML = "&#8595;";
  } else {
    sortDirection.innerHTML = "&#8593;";
    params.direction = "asc";
  }
}

function setParams() {
  const urlParams = new URLSearchParams(window.location.search);

  for (const [key, value] of urlParams) {
    params[key] = value;
  }
}

function setButtonsBasedOnParams() {
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

  if (params.type !== "") {
    typeMainButton.style.display = "inline";
    typeMain.style.display = "inline";
    typeMainButton.innerHTML = params.type + typeMainButton.innerHTML;
  }

  if (params.location !== "") {
    locationMainButton.style.display = "inline";
    locationMain.style.display = "inline";
    locationMainButton.innerHTML =
      params.location + locationMainButton.innerHTML;
  }

  if (params.sort !== "") {
    sortCategory.value = params.sort;
  }

  if (params.direction === "" || params.direction === "asc") {
    sortDirection.innerHTML = "&#8593;";
  } else {
    sortDirection.innerHTML = "&#8595;";
  }

  document.querySelectorAll("#sortCategory option").forEach((opt) => {
    if (params.type) {
      if (opt.value.includes("type")) {
        opt.disabled = true;
      }
    }

    if (params.location) {
      if (opt.value.includes("location")) {
        opt.disabled = true;
      }
    }
  });
}

function initDates() {
  if (params.dateStart) {
    dateStart.value = params.dateStart;
  } else {
    let yesterday = new Date();
    yesterday.setMinutes(
      yesterday.getMinutes() - yesterday.getTimezoneOffset()
    );
    yesterday.setDate(yesterday.getDate() - 1);
    dateStart.valueAsDate = yesterday;
    params.dateStart = formatDate(yesterday);
  }

  if (params.dateEnd) {
    dateEnd.value = params.dateEnd;
  } else {
    let today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    dateEnd.valueAsDate = today;
    params.dateEnd = formatDate(today);
  }
}
async function setURL() {
  let append = "?";

  if (
    (params.location && params.sort.includes("location")) ||
    (params.type && params.sort.includes("type"))
  ) {
    params.sort = "datetime";
  }

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

  window.location = "/" + append;
}

function toggleOnLocationFilter(loc) {
  params["location"] = loc.innerHTML;
  setURL();
}

function toggleOnTypeFilter(type) {
  params["type"] = type.innerHTML;
  setURL();
}

function handleSortChange() {
  params.sort = sortCategory.value;
  setURL();
}

function formatDate(date) {
  return new Date(date).toISOString().slice(0, 10);
}

sortDirection.addEventListener(
  "click",
  () => {
    handleDirectionButton();
  },
  false
);

dateSet.addEventListener(
  "click",
  () => {
    params.dateStart = formatDate(dateStart.value);
    params.dateEnd = formatDate(dateEnd.value);
    setURL();
  },
  false
);

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

sortSet.addEventListener(
  "click",
  () => {
    handleSortChange();
  },
  false
);

if (clear) {
  clear.addEventListener(
    "click",
    () => {
      Object.keys(params).forEach((i) => (params[i] = ""));
      setURL();
    },
    false
  );
}
setParams();
setButtonsBasedOnParams();
initDates();
