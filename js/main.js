import Request from "./request.js";
import {nanoid} from "../node_modules/nanoid/nanoid.js";


function createTodoList(todos){
    const todoList = document.querySelector("#todo-list");
    todos.forEach(todo=>{
        const finishedTodo = (todo.isFinished ? "todo-item-finished" : "");
        const checked = (todo.isFinished ? "checked" : "");
        const newTodo = `<li> <input type="checkbox" class="todo-check" ${checked}>
        <span id="${todo.id}" class="todo-item ${finishedTodo}">${todo.description}</span> </li>`;
        todoList.insertAdjacentHTML("beforeend",newTodo);
    });

    // after all the todos are in the DOM, get all of them and add click eventListener one by one.
    // todoCheckboxes is nodeList not JS Array!!!
    const todoCheckboxes = document.querySelectorAll(".todo-check");
    todoCheckboxes.forEach(todoCheckbox => {
        addTodoClickEvt(todoCheckbox);
        const todoItem = todoCheckbox.nextElementSibling;
        // builing the completed todos list
        if (todoItem.classList.contains("todo-item-finished")){
            addToCompletedList(todoItem);
        } 
    });
}


async function getTodos(){
    const request = new Request();
    request.setBaseURL("http://localhost:3000");
    try{
            const data = await request.loadTodos("/to-dos");
            createTodoList(data);
    }catch(error){
        console.log(error);
    }

}

async function saveNewTodos(todo){
    const request = new Request();
    request.setBaseURL("http://localhost:3000");
    try{
        const data = await request.postTodos("/to-dos",todo);
        console.log(data);
    }catch(error){
        console.log(error);
    }
}

async function removeFinishedTodo(todoID){
    const request = new Request();
    request.setBaseURL("http://localhost:3000");
    try{

        const data = await request.removeTodo("/to-dos",todoID);
        console.log(data);
    }catch(error){
        console.log(error);
    }
}


async function changeTodoState(todoID,todoState){
    const request = new Request();
    request.setBaseURL("http://localhost:3000");
    try{
        const data = await request.updateTodo("/to-dos",todoID,todoState);
        console.log(data);
    }catch(error){
        console.log(error);
    }
}


function addTodoClickEvt(todoInput){
    debugger;
    todoInput.addEventListener("click",()=>{
        const todoItem = todoInput.nextElementSibling;
        if (todoItem.classList.contains("todo-item-finished")){
            todoItem.classList.remove("todo-item-finished");
            removeFromCompletedList(todoItem);
            
        }
        else{
            todoItem.classList.add("todo-item-finished");
            addToCompletedList(todoItem); 
        }
        changeTodoState(todoItem.id, todoInput.checked);
    });
}



function addFinishedTodoClickEvt(finishedItem, ticIcon){
    ticIcon.addEventListener("click",()=>removeTodo(finishedItem));
}

function removeTodo(finishedItem){
    finishedItem.parentElement.classList.add("animate__animated", "animate__lightSpeedOutLeft");
    
    finishedItem.parentElement.addEventListener("animationend", ()=>{
        const TodosList = document.querySelector("#todo-list");
        const finishedTodosList = document.querySelector("#finished-list");
        const TodoElementID = finishedItem.id.replace("finished","todo");
        const TodoElement = document.getElementById(TodoElementID);

        //remove the todo from the todo list
        // TodoElement is <input> but we want to remove <li> (aka the parentElement)
        TodosList.removeChild(TodoElement.parentElement);

        //remove the finished todo from the completed todo list
        // TodoElement is <span> but we want to remove <li> (aka the parentElement)
        finishedTodosList.removeChild(finishedItem.parentElement);

        //make a delete request to erase this todo.
        removeFinishedTodo(TodoElementID);
    })
    

}


function addTodoOnClick(){
    const addTodoButton = document.querySelector("#add-todo");
    addTodoButton.addEventListener("click",addNewTodo);
}

function addNewTodo(){
    const userTodo = document.querySelector("#new-todo").value;
    if(userTodo){
        const todoList = document.querySelector("#todo-list");
        const id = nanoid(5);
        const newTodo = `<li> <input type="checkbox" class="todo-check">
        <span id="todo-item-${id}" class="todo-item">${userTodo}</span> </li>`;
        todoList.insertAdjacentHTML("beforeend",newTodo);
        //post todos to the server
        const userTodoItem = {
            id: `todo-item-${id}`,
            description: userTodo,
            isFinished: false
        }
        saveNewTodos(userTodoItem);

        //get all the checkboxes
        const todoCheckboxes = document.querySelectorAll(".todo-check");
        //only add the clickEvent to the last todo 
        const lastTodo = todoCheckboxes[todoCheckboxes.length - 1];
        addTodoClickEvt(lastTodo);
        document.querySelector("#new-todo").value = "";
    }
    else{
        const errorOutput = document.querySelector("#error-message");
        errorOutput.style.color = "red";
        errorOutput.textContent = "You must write a TO-DO first!!!"
    }
}


function addToCompletedList(finishedItem){
    //making a ID for finished todo. 
    //the ID shares the UUID, but start with finished-item
    const finishedElementID = finishedItem.id.replace("todo","finished");
    const finishedElement = `<li><span id="${finishedElementID}" class="finished-item">${finishedItem.textContent}</span> <i id="icon-${finishedElementID}" class="fas fa-check"></i> </li>`;
    const finishedList = document.querySelector("#finished-list");
    finishedList.insertAdjacentHTML("beforeend",finishedElement);

    const finishedTodo = document.querySelector(`#${finishedElementID}`);
    const finishedTic = finishedTodo.nextElementSibling;
    addFinishedTodoClickEvt(finishedTodo,finishedTic);
}


function removeFromCompletedList(finishedItem){
    const finishedList = document.querySelector("#finished-list");
    const finishedElementID = finishedItem.id.replace("todo","finished");
    //find the todo using the ID;
    const finishedTodo = document.querySelector(`#${finishedElementID}`);
    //finishedTodo is <span>, but we want to remove <li>, which is the parentElement
    finishedList.removeChild(finishedTodo.parentElement);
}

function inputOnfocus(){
    const userTodo = document.querySelector("#new-todo");
    userTodo.addEventListener("focus",()=>{
        const errorOutput = document.querySelector("#error-message");
        errorOutput.textContent = "";
    });
}

function viewCmptTodos(){
    const flipDiv = document.querySelector(".flip-card-inner");
        (flipDiv.style.transform === "rotateY(180deg)") ? flipDiv.style.transform = "rotateY(0deg)" : flipDiv.style.transform = "rotateY(180deg)";
}

document.querySelector("#flipBtn").onclick = viewCmptTodos;
document.querySelector("#returnBtn").onclick = viewCmptTodos;

getTodos();
addTodoOnClick();
inputOnfocus();