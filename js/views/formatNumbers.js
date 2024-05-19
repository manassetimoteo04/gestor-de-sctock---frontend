class FormatNumbers {
  constructor() {}
  formatCurrency(number) {
    const numb = number;
    const options = {
      style: "currency",
      currency: "AOA",
    };
    return new Intl.NumberFormat("pt-AO", options).format(numb);
  }
  formatDates = function (now) {
    const calDaysFuntion = (date1, date2) =>
      Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
    const displayDays = calDaysFuntion(new Date(), now);
    if (displayDays === 0) return `Hoje`;
    if (displayDays === 1) return `Ontem`;
    if (displayDays <= 7) return `Há ${displayDays} dias`;
    return new Intl.DateTimeFormat("pt-PT").format(now);
  };
}
const formatNumbers = new FormatNumbers();
export { formatNumbers };
