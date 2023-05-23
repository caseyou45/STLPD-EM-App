const locations = document.getElementsByClassName("location");
const types = document.getElementsByClassName("type");
const locationButton = document.getElementById("locationMain");
const typeButton = document.getElementById("typeMain");

const params = { location: "", type: "", sort: "", direction: "" };

for (let index = 0; index < locations.length; index++) {
  const location = locations[index];
  location.addEventListener("click", () => goToLocation(location), false);

  const type = types[index];
  type.addEventListener("click", () => goToType(type), false);
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

function clearParams() {
  params.location = "";
  params.type = "";
  createURL();
}

function toggleFilter(event) {
  var button = document.getElementById(event.id);
  button.style.display = "none";
}

const searchParams = new URLSearchParams(window.location.href.split("?")[1]);
for (const [key, value] of searchParams) {
  params[key] = value;
}
