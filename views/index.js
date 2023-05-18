const locations = document.getElementsByClassName("location");
const types = document.getElementsByClassName("type");

const params = { location: "", type: "" };

for (let index = 0; index < locations.length; index++) {
  locations[index].addEventListener(
    "click",
    () => goToLocation(locations[index]),
    false
  );
  types[index].addEventListener("click", () => goToType(types[index]), false);
}

function goToLocation(loc) {
  params["location"] = loc.childNodes[0].innerHTML;
  createURL();
}

function goToType(type) {
  params["type"] = type.childNodes[0].innerHTML;
  createURL();
}

function createURL() {
  const url = new URL("http://localhost:8000");
  for (const [key, value] of Object.entries(params)) {
    if (value) url.searchParams.append(key, value);
  }
  window.location = url.href;
}

const searchParams = new URLSearchParams(window.location.href.split("?")[1]);
for (const [key, value] of searchParams) {
  params[key] = value;
}
