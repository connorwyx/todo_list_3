const form = document.querySelector("form");
const newInput = document.querySelector("input");
const main = document.querySelector(".main");
const week = [null, "MON", "TUE", "THU", "WED", "FRI", "SAT", "SUN"];
let data = [];
function alt(e) {
  console.log(e);
}
function cancel(e) {
  console.log(e);
}

form.addEventListener("submit", (e) => {
  console.log(e);
  e.preventDefault();
  const todo = e.target[0].value;
  const NewMemo = document.createElement("div");
  const time = new Date();
  const date = `${time.getFullYear()} ${time.getMonth()} ${time.getDate()} ${
    week[time.getDay()]
  }`;
  NewMemo.id = time.getTime();
  NewMemo.className = "memo";
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
  const pen = NewMemo.lastElementChild.firstElementChild;
  const trash = NewMemo.lastElementChild.lastElementChild;
  pen.addEventListener("click", alt);
  trash.addEventListener("click", cancel);
  data.push({ id: time.getTime(), content: todo });
  localStorage.setItem("data", JSON.stringify(data));
});
