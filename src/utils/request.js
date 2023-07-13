export const formatDateTime = (milliseconds) => {
  let d = new Date(milliseconds);
  let weekday = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];
  let day = weekday[d.getDay()];
  let date = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();

  return `${day} - ${date.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year} ${hours}:${minutes}:${seconds}`;
};
