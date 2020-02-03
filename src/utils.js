export function dateFormat(datetime) {
  return (
    datetime.getFullYear() +
    "-" +
    (datetime.getMonth() < 10
      ? "0" + (datetime.getMonth() + 1)
      : datetime.getMonth() + 1) +
    "-" +
    (datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate())
  );
}
export function currencyFormat(amount) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "NGN"
  });
}
