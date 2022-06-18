export const sum = (a, b) => a + b;
export const divide = (a, b) => a / b;
export const getCookie = (name) => {
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
};
