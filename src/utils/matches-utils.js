function getCurrentYear() {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  return currentMonth >= 8 ? currentYear : currentYear - 1;
}
module.exports = { getCurrentYear };
