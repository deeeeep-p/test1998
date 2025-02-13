const total = (arr) => {
  return arr.reduce((acc, item) => acc + (item ? item : 0), 0);
};

const percentProgress = (arr) => {
  const currentMonthIndex = new Date().getMonth() - 1;
  console.log(arr[currentMonthIndex]);
  return ((arr[currentMonthIndex] / total(arr)) * 100).toFixed(0);
};

export { percentProgress, total };
