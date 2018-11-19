import { user } from "../model/model.js"
import View from "./view"
import RequestManager from "./RequestManager"
// import {  } from "util";

export default class ViewController {
    constructor() {
        this.view = new View();
        this.form = document.getElementById("loginform");
        this.init();
    }

    init() {
        this.form.onsubmit = ((event) => {
            event.preventDefault();
            var formData = new FormData(this.form);
            var response = RequestManager.postData(formData);
            response.then((res) => this.responseCallback(res))
            response.catch((err) => console.log(err))
        });
    }

    responseCallback(response) {
        user.name = document.getElementById("username").value;
        user.tasks = response;
        let tasks = user.tasks;
        history.pushState({}, "user-task", "user-task");
        this.view.showPage2Content(tasks);
    }

    onpopstate(event) {
        console.log('onpopstate');
    }

    onhashchange(event) {
        console.log('onhashchange');
    }
}