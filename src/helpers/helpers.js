export const convertDateToDDMMYYYYHHMMSS = dt => {
  let date = new Date(dt);
  const convertedDate = date.toLocaleString('en-GB');
  return convertedDate;
};
