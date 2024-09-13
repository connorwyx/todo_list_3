const form = document.querySelector("form");
const newInput = document.querySelector("input");
const main = document.querySelector(".main");

const week = [null, "MON", "TUE", "THU", "WED", "FRI", "SAT", "SUN"];

let data = [];
let colors = ["tomato", "gold", "limegreen"];

function alt(e) {
  console.log(e);
}
function cancel(e) {
  console.log(e);
}

function SelectColor() {
  if (data.length % 3 == 0) {
    return "limegreen";
  } else {
    return colors[(data.length % 3) - 1];
  }
}
function paint(todo, time) {
  // creating a new div
  const NewMemo = document.createElement("div");
  // this is for defining date
  const date = `${time.getFullYear()} ${
    time.getMonth() + 1
  } ${time.getDate()} ${week[time.getDay()]}`;

  // making the html
  NewMemo.className = "memo";
  NewMemo.id = time.getTime();
  NewMemo.innerHTML = `
          <!-- left -->
          <div class="left">
            <div class="circle"></div>
            <div class="box">
              <p>${todo}</p>
              <small>${date}</small>
            </div>
          </div>
          <!-- right -->
          <div class="right">
            <span id="pen">✏️</span>
            <span id="trash">🚫</span>
          </div>`;
  main.append(NewMemo);

  // defining pen and trash
  const pen = NewMemo.lastElementChild.firstElementChild;
  const trash = NewMemo.lastElementChild.lastElementChild;
  pen.addEventListener("click", alt);
  trash.addEventListener("click", cancel);

  // datas
  data.push({ id: time.getTime(), content: todo, time: date });
  // changing the color of the circle
  NewMemo.firstElementChild.firstElementChild.style.backgroundColor =
    SelectColor();
  // finally saving the data
  localStorage.setItem("data", JSON.stringify(data));
}

// this the form
form.addEventListener("submit", (e) => {
  console.log(e);
  e.preventDefault();

  // this is the content
  const todo = newInput.value.trim();
  const time = new Date();
  if (todo === "") {
    newInput.value = "";
    return;
  }

  //creating new things
  paint(todo, time);
  newInput.value = "";
});

// function init() {
//   if (localStorage.getItem("data") != null) {
//     data = JSON.parse(localStorage.getItem("data"));
//     console.log("working");
//     data.forEach((datas) => {
//       const todo = datas.content;
//       const time = datas.time;
//       paint(todo, time);
//     });
//   }
// }
// init();
