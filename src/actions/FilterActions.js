import { parseInputDate } from "../util/DateUtil";

const setStartDateFromStr = ({ dateStr, filterOptions }) => {
  const date = parseInputDate(dateStr);
  filterOptions.startDate.set(date);
}

export {
  setStartDateFromStr
}