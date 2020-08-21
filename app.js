/* 
Private Property of Vishal Tyagi

Copyright (c) 2020 VisualTaggy


The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

//Selector(s)
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const todoButton = document.querySelector(".todo-button");
const filterOption = document.querySelector(".filter");

//Event Listener(s)
document.addEventListener("DOMContentLoaded", updateUI);
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterList);
//Function(s)
function addToDo(event) {
  event.preventDefault();
  //creating DIV for all other elements
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");
  //creating Li
  const newtoDo = document.createElement("li");
  newtoDo.classList.add("new-todo");
  newtoDo.innerText = `${todoInput.value}`;
  todoDiv.appendChild(newtoDo);
  //Saving locally
  saveLocally(todoInput.value);
  //Check mark
  const completedBtn = document.createElement("button");
  completedBtn.classList.add("complete-btn");
  completedBtn.innerHTML = ' <i class="fas fa-check"></i>';
  todoDiv.appendChild(completedBtn);
  //Trash Button
  const trashBtn = document.createElement("button");
  trashBtn.classList.add("trash-btn");
  trashBtn.innerHTML = ' <i class="fas fa-trash"></i>';
  todoDiv.appendChild(trashBtn);
  //Append to list
  todoList.appendChild(todoDiv);
  // clearing todo value
  todoInput.value = "";
}

//Delete To Do list
function deleteCheck(event) {
  //Checking where the user click
  const item = event.target;
  if (item.classList[0] === "trash-btn") {
    let trash = item.parentElement;
    //Adding delete animations
    trash.classList.add("fall");
    //Removing elements from user's local storage
    clearLocalStorage(trash);
    //Actually deleting element once animation is complete
    trash.addEventListener("transitionend", function () {
      trash.remove();
    });
    //Adding task complete animations
  } else if (item.classList[0] === "complete-btn") {
    let check = item.parentElement;
    check.classList.toggle("completed");
  }
}

//Filter to-do list based on task completed or uncompleted
function filterList(event) {
  // Storing all Li from the Ul
  const todos = todoList.childNodes;
  //Looping over all the elements in the current to do list
  todos.forEach(function (todo) {
    //Modifying Stylesheet to hide or show elements
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//For storing elements locally on clients machine
function saveLocally(item) {
  let dataList;
  //Standard check for existing data
  if (localStorage.getItem("dataList") === null) {
    dataList = [];
  } else {
    dataList = JSON.parse(localStorage.getItem("dataList"));
  }
  // pushing new data
  dataList.push(item);
  localStorage.setItem("dataList", JSON.stringify(dataList));
}

//Updating UI once the browser reopens aka converting local data into actual to-do list
function updateUI() {
  let dataList;
  //Standard check for exisiting data
  if (localStorage.getItem("dataList") === null) {
    dataList = [];
  } else {
    dataList = JSON.parse(localStorage.getItem("dataList"));
  }
  dataList.forEach(function (element) {
    //creating DIV for all other elements
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");
    //creating Li
    const newtoDo = document.createElement("li");
    newtoDo.classList.add("new-todo");
    newtoDo.innerText = element;
    todoDiv.appendChild(newtoDo);
    //Check mark
    const completedBtn = document.createElement("button");
    completedBtn.classList.add("complete-btn");
    completedBtn.innerHTML = ' <i class="fas fa-check"></i>';
    todoDiv.appendChild(completedBtn);
    //Trash Button
    const trashBtn = document.createElement("button");
    trashBtn.classList.add("trash-btn");
    trashBtn.innerHTML = ' <i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashBtn);
    //Append to list
    todoList.appendChild(todoDiv);
  });
}

// Remove Local Stuff

function clearLocalStorage(element) {
  let dataList;
  //Standard check for existing data
  if (localStorage.getItem("dataList") === null) {
    dataList = [];
  } else {
    dataList = JSON.parse(localStorage.getItem("dataList"));
  }

  const elementIndex = element.children[0].innerText;
  dataList.splice(dataList.indexOf(elementIndex), 1);
  localStorage.setItem("dataList", JSON.stringify(dataList));
}
