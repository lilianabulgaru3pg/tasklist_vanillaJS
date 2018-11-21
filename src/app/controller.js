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
            var response = RequestManager.postData('user-tasks', formData, {});
            response.then((res) => this.responseCallback(res)).catch((err) => console.log(err))
        });
    }

    responseCallback(response) {
        user.tasks = response;
        user.name = document.getElementById("username").value;
        history.pushState({}, "User Tasks", "user-tasks");
        let firstTask = response[0];
        console.log('firstTask', firstTask);
        let itemsResponse = RequestManager.getItemsForTask(`user-tasks/${firstTask._id}/items`);
        itemsResponse.then((res) => {
            this.view.showPage2Content(res);
        }).catch((err) => console.log(err));
    }

    onTaskLinkClick(event) {
        event.preventDefault();
        var href = event.target.getAttribute('href');
        // var title = event.target.getAttribute('text');
        // history.pushState({}, title, href);
        if (href == undefined) { return }
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

    createTaskBtn(event) {
        event.preventDefault();
        var addtaskInput = document.body.querySelector('.add-task-input');
        if (!addtaskInput.value) return;
        console.log('addtaskInput.value', addtaskInput.value);
        let response = RequestManager.postData('user-tasks/add-task', JSON.stringify({ title: addtaskInput.value }), {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        response.then((newTask) => this.view.addNewTask(newTask)).catch((err) => console.log(err))
        addtaskInput.value = '';
    }

    taskItemDone(event) {

    }
}