function isEmpty(value) {
  // value is received parameter which can be object or string to check if empty or not?
  // this will return true or false
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
}

module.exports = isEmpty;
