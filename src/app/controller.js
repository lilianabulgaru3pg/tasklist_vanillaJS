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
        var url = event.target.getAttribute('href');;
        // var title = event.target.textContent;
        // history.pushState({}, 'title', href);
        if (url === undefined) { return }
        this.activeLinkID = url.split('/')[1];
        let response = RequestManager.getItemsForTask(url);
        console.log('url', url);
        response.then((items) => {
            console.log('recreateTaskItems with items', items);
            this.view.recreateTaskItems(items);
        }).catch(err => console.log(err));
    }

    onpopstate(event) {
        console.log('onpopstate');
    }

    createTask(value) {
        let response = RequestManager.postData('user-tasks/add-task', JSON.stringify({ title: value }), {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        response.then((newTask) => this.view.showNewTask(newTask)).catch((err) => console.log(err))
    }

    createItem(value) {
        console.log('activeLinkID', this.activeLinkID);
        let response = RequestManager.postData(`user-tasks/${this.activeLinkID}/add-item`, JSON.stringify({ text: value }), {
            'Content-Type': 'application/json'
        });
        response.then((newItem) => this.view.showNewItem(newItem)).catch((err) => console.log(err))
    }

    taskItemDone(event) {

    }
}