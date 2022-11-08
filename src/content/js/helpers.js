export function checkExpiryDate(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateString);
  console.log(today)
  console.log(date)
  if (date < today) {
    return true;
  } else {
    return false;
  }
}
