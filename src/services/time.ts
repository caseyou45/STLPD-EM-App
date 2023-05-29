function createLocalDate(datetime: Date): string {
  try {
    return datetime.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    return "Unavailable";
  }
}

function createLocalTime(datetime: Date): string {
  try {
    return datetime.toLocaleTimeString("en-us");
  } catch (error) {
    return "Unavailable";
  }
}

export { createLocalDate, createLocalTime };
