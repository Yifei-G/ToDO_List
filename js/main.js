import Request from "./request.js";

function createTodoList(todos){
    const todoList = document.querySelector("#todo-list");
    todos.forEach(todo=>{
        const newTodo = `<li> <input type="checkbox" class="todo-check">
        <span class="todo-item">${todo}</span> </li>`;        
        todoList.insertAdjacentHTML("beforeend",newTodo);
    });

    // after all the todos are in the DOM, get all of them and add click eventListener one by one.
    // todoCheckboxes is nodeList not JS Array!!!
    const todoCheckboxes = document.querySelectorAll(".todo-check");
    todoCheckboxes.forEach(todoCheckbox => addClickEvent(todoCheckbox));
}


async function getTodos(){
    const request = new Request();
    request.setBaseURL("http://localhost:3000");
    try{
            const data = await request.loadTOdos("/to-dos");
            createTodoList(data);
    }catch(error){
        console.log(error);
    }

}


function addClickEvent(todoInput){
    todoInput.addEventListener("click",()=>{
        const todoItem = todoInput.nextElementSibling;
        if (todoInput.checked){
            todoItem.style.textDecorationLine = "line-through";
        }
        else{
            todoItem.style.textDecorationLine = "none";
        }
    });
}


function addTodoOnClick(){
    const addTodoButton = document.querySelector("#add-todo");
    addTodoButton.addEventListener("click",addNewTodo);
}

function addNewTodo(){
    const userTodo = document.querySelector("#new-todo").value;
    if(userTodo){
        const todoList = document.querySelector("#todo-list");
        const newTodo = `<li> <input type="checkbox" class="todo-check">
        <span class="todo-item">${userTodo}</span> </li>`;
        todoList.insertAdjacentHTML("beforeend",newTodo);

        //get all the checkboxes
        const todoCheckboxes = document.querySelectorAll(".todo-check");
        //only add the clickEvent to the last todo 
        const lastTodo = todoCheckboxes[todoCheckboxes.length - 1];
        addClickEvent(lastTodo);
        document.querySelector("#new-todo").value = "";
    }
    else{
        const errorOutput = document.querySelector("#error-message");
        errorOutput.style.color = "red";
        errorOutput.textContent = "You must write a TO-DO first!!!"
    }
}

function inputOnfocus(){
    const userTodo = document.querySelector("#new-todo");
    userTodo.addEventListener("focus",()=>{
        const errorOutput = document.querySelector("#error-message");
        errorOutput.textContent = "";
    });
}

getTodos();
addTodoOnClick();
inputOnfocus();