const startOfThisYear = () => {
  return new Date(`${new Date().getFullYear()}-01-01T00:00:00Z`);
}

const formatDateForInput = date => {
  let month = '' + (date.getUTCMonth() + 1);
  let day = '' + date.getUTCDate();
  let year = date.getUTCFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }

  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
}

const parseInputDate = dateStr => {
  const date = new Date('2018-01-01T00:00:00Z');
  const parts = dateStr.split('-');
  date.setUTCFullYear(parseInt(parts[0]));
  date.setUTCMonth(parseInt(parts[1]) - 1);
  date.setUTCDate(parseInt(parts[2]));

  return date;
}

export {
  startOfThisYear,
  formatDateForInput,
  parseInputDate
}