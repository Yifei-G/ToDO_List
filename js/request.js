export default class Request {
    constructor(){
        this.baseURL = "";
    }

    setBaseURL(baseURL){
        this.baseURL = baseURL;
    }
    
    async loadTOdos(relativeUrl){
        const URL = this.baseURL + relativeUrl;
        const response = await fetch(URL);
        return response.json();
    }

}






