export let params = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export const setCookie = (name, value, minutes, seconds) => {
  var date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000 + seconds * 1000);

  var expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + "; " + expires + "; path=/";
};
