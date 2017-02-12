let input = document.getElementById('add_item_input');
let list = document.getElementById('list');
let add_button = document.getElementById('add_item_button');
let todos_store = [];




let get_all_todos = function() {
  fetch('http://localhost:8000/todos', {method:'get'})
  .then( function (response) {
    return response.json();
  })
  .then( function (todos) {
    for (key in todos) {
      todos_store.length = 0;
      todos_store[key] = todos[key];
      insert_item(todos[key].text);
    }
    console.log(todos);
  }).catch(alert);
}

get_all_todos();

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
  remove_button.id = todos_store.filter((value) => {return text == value.text })[0]["_id"];
  remove_button.addEventListener("click", () => {
    let item = remove_button.parentNode;
    let text = item.firstChild.innerHTML;
    fetch('http://localhost:8000/todos/' + remove_button.id, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'cache-control': 'no-cache'
      },
      method: "DELETE"
    })
      .then(function(res) {console.log(res) })
      .catch(function(res) {console.log(res)})
    item.getElementsByTagName("p").innerHTML
    list.removeChild(item);
  })
  li.appendChild(remove_button);
  list.appendChild(li);
}

function add_item() {
  if (input.value) {
    var string = input.value;
    fetch('http://localhost:8000/todos', {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'cache-control': 'no-cache'
      },
      method: "POST",
      body: "body=" +encodeURI(string)
    })
      .then(function(res) {
        console.log(res.blob());

         })
      .catch(function(res) {console.log(res)})
      insert_item(input.value);
    input.value = '';
    input.focus();
  }
};
