const toMoney = (price: number) => {
  return price
    ? price
        .toString()
        .split("")
        .reverse()
        .reduce((prev, next, index) => {
          return (index % 3 ? next : next + ".") + prev;
        })
    : 0;
};
export default toMoney;
