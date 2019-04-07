// value is received parameter which can be object or string to check if empty or not?
// this will return true or falseconst isEmpty = value =>
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export default isEmpty;
