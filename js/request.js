export default class Request {
    constructor(){
        this.baseURL = "";
    }

    setBaseURL(baseURL){
        this.baseURL = baseURL;
    }
    
    async loadTodos(relativeURL){
        const URL = this.baseURL + relativeURL;
        const response = await fetch(URL);
        return response.json();
    }

    async postTodos(relativeURL,todo){
        const URL = this.baseURL + relativeURL;
        const response = await fetch(URL,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        });
        return response.json();
    }

    async removeTodo(relativeURL,ID){
        const URL = this.baseURL + relativeURL + "/" + ID;
        console.log(URL);
        const response = await fetch(URL,{
            method: "DELETE"
        });
        return response.json();
    }
}






