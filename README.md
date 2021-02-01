# ToDO_List

## About the project:

This is a simple web project using pure javascript in order to modify HTML elements in the DOM. 
The objective of this project is to improve and apply all my JS knowledge into a real-life scenario.

## How to install the project:

This project contain dependencies of other projects, if you want to run this project locally, you should do the following:

1. Clone this repository to your local working enviroment (whatever directory in your computer)

2. inside the ToDO_List/ folder, run the following command:
    npm install (you need to install npm first!!!)  Check the [official website to get npm](https://www.npmjs.com/get-npm).
    
3. Since this web project contains interaction with a jason server, you need to run the project in a local web server. The simple option is use python web server:
If you have python3 installed, in the project folder, run the following command:
```
python3 -m http.server
```
4. In another terminal run the json-server:

```
jason-server --watch data.json
```
Make sure the jason-server is running at localhost:3000/

5. Open your brower and then type:
localhost:8000/main.html

6. This should allow you to run the To-do list

## Known issues:

Please don't run this project in Mozilla Firefox, due to this known [bug](https://bugzilla.mozilla.org/show_bug.cgi?id=876341)

backface-visibility:hidden is ignored by Firefox
