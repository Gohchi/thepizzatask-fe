export const calculateTotalCount = items => {
  return Object.values(items).reduce((t, v) => v + t, 0)
};

export const roundNumber = num => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export const formatDate = date => {
  const region = "en-US";
  return date.toLocaleDateString(region) + ' ' + date.toLocaleTimeString(region);
}