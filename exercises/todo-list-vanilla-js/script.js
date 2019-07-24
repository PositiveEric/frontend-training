// Array (mutable) containing the to do items.
const items = [
  { name: "Watch JS tutorial", isDone: true },
  { name: "Do JS exercises", isDone: false }
];
// Creating new variables.
const form = document.getElementById("form");
const inputElement = document.getElementById("userInput");
const addButton = document.getElementById("enter");

// When ever for submit event happenes, we create and add a new item
addButton.addEventListener("click", (e) => {
  // prevent browser from reloding the page
  e.preventDefault();

  //
  const name = inputElement.value;
  if (!name) return;
  const newItem = {
    name: name,
    isDone: false
  };
  items.push(newItem);
  // Re-render the list with new state;
  drawList();
  inputElement.value = "";
});
//  A function to render and reflect the new state of items in browser.
function drawList() {
  const list = document.getElementById("list");
  //Reset the list and make it empty
  list.innerHTML = "";

  for (let i in items) {
    let item = items[i];
    // Handle done/notDone toggling for every list item
    const li = document.createElement("li");
    li.addEventListener("click", () => {
      item.isDone = !item.isDone;
      li.className = item.isDone ? "done" : "";
    });
    if (item.isDone) {
      li.className = "done";
    }
    li.innerText = item.name;
    const btn = document.createElement("button");
    btn.innerText = "x";
    btn.addEventListener("click", () => {
      items.splice(i, 1);
      drawList();
    });

    li.appendChild(btn);
    list.appendChild(li);
  }
}

drawList();

// <!-- <li class="delete">Read JS book<button>X</button></li>
// <li class="done">Watch JS tutorial<button>X</button></li>
// <li>Do JS exercises<button>X</button></li> -->
