import { parseInputDate } from "../util/DateUtil";

const createFilterActions = store => {
  const setStartDateFromStr = dateStr => {
    const date = parseInputDate(dateStr);
    store.filterOptions.startDate.set(date);
    applyFilters();
  }

  const applyFilters = () => {
    const { filterOptions } = store;
    const startDate = filterOptions.startDate.get();
    store.filteredBugs.replace(store.bugs.filter(bug => {
      return new Date(bug.creation_time) >= startDate;
    }));
  }

  return {
    setStartDateFromStr,
    applyFilters
  }
}

export {
  createFilterActions
}