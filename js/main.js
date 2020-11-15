import Request from "./request.js";
import {nanoid} from "../node_modules/nanoid/nanoid.js";


function createTodoList(todos){
    const todoList = document.querySelector("#todo-list");
    todos.forEach(todo=>{
        //generate a uuid for each todo item
        const id = nanoid(5);
        const newTodo = `<li> <input type="checkbox" class="todo-check">
        <span id="todo-item-${id}" class="todo-item">${todo}</span> </li>`;     
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
            addToCompletedList(todoItem);
        }
        else{
            todoItem.style.textDecorationLine = "none";
            removeFromCompletedList(todoItem);
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
        const id = nanoid(5);
        const newTodo = `<li> <input type="checkbox" class="todo-check">
        <span id="todo-item-${id}" class="todo-item">${userTodo}</span> </li>`;
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


function addToCompletedList(finishedItem){
    //making a ID for finished todo. 
    //the ID shares the UUID, but start with finished-item
    const finishedElementID = finishedItem.id.replace("todo","finished");
    const finishedElement = `<li><span id="${finishedElementID}" class="finished-item">${finishedItem.textContent}</span></li>`;
    const finishedList = document.querySelector("#finished-list");
    finishedList.insertAdjacentHTML("beforeend",finishedElement);
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