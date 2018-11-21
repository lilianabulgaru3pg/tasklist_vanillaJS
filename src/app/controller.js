import { user } from "../model/model.js"
import View from "./view"
import RequestManager from "./RequestManager"

export default class ViewController {
    constructor() {
        this.view = new View();
        this.view.delegate = this;
        this.activeLinkID = '';
        this.user = user;
    }

    loginRequest(formData) {
        var response = RequestManager.postData('user-tasks', formData, {});
        response.then((res) => this.responseCallback(res)).catch((err) => console.log(err))
    }

    responseCallback(userTasks) {
        let username = document.getElementById("username").value;
        history.pushState({}, "User Tasks", "user-tasks");
        let firstTask = userTasks[0];
        console.log('firstTask', firstTask);
        this.activeLinkID = firstTask._id;
        let itemsResponse = RequestManager.getItemsForTask(`user-tasks/${firstTask._id}/items`);
        itemsResponse.then((items) => {
            this.view.showPage2Content(items, userTasks, username);
        }).catch((err) => console.log(err));
    }

    onTaskLinkClick(event) {
        event.preventDefault();
        this.activeLinkID = event.target.getAttribute('href');;
        // var title = event.target.textContent;
        // history.pushState({}, 'title', href);
        if (this.activeLinkID == undefined) { return }
        let response = RequestManager.getItemsForTask(this.activeLinkID);
        console.log('url', this.activeLinkID);
        response.then((res) => {
            console.log('recreateTaskItems with items', res);
            this.view.recreateTaskItems(res);
        }).catch(err => console.log(err));
    }

    onpopstate(event) {
        console.log('onpopstate');
    }

    createTask(value) {
        let response = RequestManager.postData('user-tasks/add-task', JSON.stringify({ title: value }), {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        response.then((newTask) => this.view.showNewTask(newTask)).catch((err) => console.log(err))
    }

    createItem(value) {
        let response = RequestManager.postData(`user-tasks/${this.activeLinkID}/add-item`, JSON.stringify({ title: value }), {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        response.then((newItem) => this.view.showNewTask(newTask)).catch((err) => console.log(err))
    }

    taskItemDone(event) {

    }
}