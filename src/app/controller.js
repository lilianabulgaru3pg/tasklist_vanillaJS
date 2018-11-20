import { user } from "../model/model.js"
import View from "./view"
import RequestManager from "./RequestManager"

export default class ViewController {
    constructor() {
        this.view = new View();
        this.view.delegate = this;
        this.form = document.querySelector("#loginform");
        this.init();
    }

    init() {
        this.form.onsubmit = ((event) => {
            event.preventDefault();
            var formData = new FormData(this.form);
            var response = RequestManager.postData('user-tasks', formData);
            response.then((res) => this.responseCallback(res)).catch((err) => console.log(err))
        });
    }

    responseCallback(response) {
        user.tasks = response;
        user.name = document.getElementById("username").value;
        history.pushState({}, "user-task", "user-task");
        let firstTask = response[0];
        console.log('firstTask', firstTask);
        let itemsResponse = RequestManager.getItemsForTask(`user-tasks/${firstTask._id}/items`);
        itemsResponse.then((res) => {
            this.view.showPage2Content(res);
        }).catch(err => console.log(err));
    }

    onTaskLinkClick(event) {
        event.preventDefault();
        let href = event.target.getAttribute('href');
        let response = RequestManager.getItemsForTask(href);
        console.log('url', href);
        response.then((res) => {
            console.log('recreateTaskItems with items', res);
            this.view.recreateTaskItems(res);
        }).catch(err => console.log(err));
    }

    onpopstate(event) {
        console.log('onpopstate');
    }

    addTaskBtn(event) {
        console.log('addTaskBtn');
    }

    taskItemDone(event) {
        console.log('taskItemDone');

    }
}