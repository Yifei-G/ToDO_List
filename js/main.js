function checkTODOList(){
    const todoCheckboxs = document.querySelectorAll(".todo-check");
    const todoList = [...todoCheckboxs]
    todoList.forEach(todo =>{
        todo.addEventListener("click",()=>{
            const todoItem = todo.nextElementSibling;
            if (todo.checked){
                todoItem.style.textDecorationLine = "line-through";
            }
            else{
                todoItem.style.textDecorationLine = "none";
            }
            
            
        });
    });
}

function addNewToDo(){
    const userTodo = document.querySelector("#new-todo").value;
    if(userTodo){
        const todoList = document.querySelector("#todo-list");
        const newTodo = `<li> <input type="checkbox" class="todo-check">
        <span class="todo-item">${userTodo}</span> </li>`;

        console.log(newTodo);
        todoList.insertAdjacentHTML("beforeend",newTodo);
        document.querySelector("#new-todo").value = "";
        checkTODOList();
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

checkTODOList();
inputOnfocus();