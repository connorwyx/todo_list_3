const form = document.querySelector("form");
const newInput = document.querySelector("input");
const main = document.querySelector(".main");

console.log(form, newInput, main);
form.addEventListener("submit", (e) => {
  console.log(e);
  e.preventDefault();
});
