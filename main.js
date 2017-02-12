let input = document.getElementById('add_item_input');
let list = document.getElementById('list');
let add_button = document.getElementById('add_item_button');

let todos_store = JSON.parse(localStorage.getItem('todos')) || [];

for (let i = 0; i < todos_store.length; i++) {
  insert_item(todos_store[i]);
}

add_button.addEventListener("click", add_item);
input.addEventListener("keypress", (e)=> {
  if (e.keyCode == 13)
    add_item();
})

function insert_item(text) {
  let li = document.createElement("li");
  li.innerHTML = text;
  li.innerHTML = "<p>" + li.innerHTML + "</p>";
  let remove_button = document.createElement('button');
  remove_button.innerHTML = 'X';
  remove_button.className = "remove_button";
  remove_button.addEventListener("click", () => {
    let item = remove_button.parentNode;
    //let text = item.firstChild.innerHTML;
    let text =item.getElementsByTagName("p").innerHTML;
    todos_store.splice(todos_store.indexOf(text), 1);
    localStorage.setItem('todos', JSON.stringify(todos_store));
    list.removeChild(item);
  })
  li.appendChild(remove_button);
  list.appendChild(li);
}

function add_item() {
  if (input.value) {
    var string = input.value;
    todos_store.push(string);
    localStorage.setItem("todos", JSON.stringify(todos_store));
    insert_item(input.value);
    input.value = '';
    input.focus();
  }
};
