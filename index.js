const form = document.querySelector("form");
const newInput = document.querySelector("input");
const main = document.querySelector(".main");

const week = [null, "MON", "TUE", "THU", "WED", "FRI", "SAT", "SUN"];

let data = [];
let colors = ["tomato", "gold", "limegreen"];

function alt(e) {
  const memo = e.target.parentElement.parentElement;
  const text = memo.innerText.split("\n")[0];
  const form = document.createElement("form");
  form.id = "updateForm";
  const input = document.createElement("input");
  memo.prepend(form);
  form.prepend(input);
  input.value = text;
  input.focus();
  form.addEventListener("submit", (e) => {
    console.log(e);
    e.preventDefault();
    console.log(input.value);
  });
}
function cancel(e) {
  const memo = e.target.parentElement.parentElement;
  const NewTodos = [];
  data.forEach((test) => {
    if (test.id != memo.id) {
      NewTodos.push(test);
    }
  });
  memo.remove();
  data = NewTodos;
  localStorage.setItem("data", JSON.stringify(data));
}

function SelectColor() {
  if (data.length % 3 == 0) {
    return "limegreen";
  } else {
    return colors[(data.length % 3) - 1];
  }
}

// this the form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // this is the content
  const todo = newInput.value.trim();
  const time = new Date();
  if (todo === "") {
    newInput.value = "";
    return;
  }

  //creating new things
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
  newInput.value = "";
});

function paint(test) {
  const NewMemo = document.createElement("div");
  // this is for defining date

  // making the html
  NewMemo.className = "memo";
  NewMemo.id = test.id;
  NewMemo.innerHTML = `
        <!-- left -->
        <div class="left">
          <div class="circle"></div>
          <div class="box">
            <p>${test.content}</p>
            <small>${test.time}</small>
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
  NewMemo.firstElementChild.firstElementChild.style.backgroundColor =
    SelectColor();
}

function init() {
  const datas = JSON.parse(localStorage.getItem("data"));
  if (datas == null) {
    console.log("empty");
    return;
  } else {
    datas.forEach((test) => {
      data.push(test);
      paint(test);
    });
  }
}
init();
