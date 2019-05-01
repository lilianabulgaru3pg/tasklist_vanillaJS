import { user } from "../model/model.js"
import View from "./view"
import RequestManager from "./RequestManager"

export default class ViewController {
    constructor() {
        this.view = new View();
        this.view.delegate = this;
        this.activeTaskID = '';
        this.user = user;
        this.activeTaskItems = [];
    }

    loginRequest(formData) {
        var response = RequestManager.requestData('POST', 'tasks', formData);
        response.then((res) => this.responseCallback(res)).catch((err) => console.log(err))
    }

    logout() {
        console.log('logout');
        let logoutStatus = RequestManager.requestData('GET', 'logout');
        logoutStatus.then(() => {
            console.log('inside logout promise');
            history.go(0);
        });
    }

    responseCallback(userTasks) {
        let username = document.getElementById("username").value;
        history.pushState({}, "User Tasks", "tasks");
        let firstTask = userTasks[0];
        console.log('firstTask', firstTask);
        this.activeTaskID = firstTask._id;
        let itemsResponse = RequestManager.requestData('GET', `tasks/${firstTask._id}/items`);
        itemsResponse.then((items) => {
            this.activeTaskItems = items;
            this.view.showPage2Content(items, userTasks, username);
        }).catch((err) => console.log(err));
    }

    onTaskLinkClick(event) {
        event.preventDefault();
        var url = event.target.getAttribute('href');;
        if (!url) { return }
        this.activeTaskID = url.split('/')[1];
        let response = RequestManager.requestData('GET', url);
        console.log('url', url);
        response.then((items) => {
            console.log('recreateTaskItems with items', items);
            this.activeTaskItems = items;
            this.view.recreateTaskItems(items);
        }).catch(err => console.log(err));
    }

    createTask(value) {
        let response = RequestManager.requestData('POST', 'tasks/add-task', JSON.stringify({ title: value }), {
            'Content-Type': 'application/json'
        });
        response.then((newTask) => this.view.showNewTask(newTask)).catch((err) => console.log(err))
    }

    createItem(value) {
        console.log('item id', this.activeTaskID);
        let response = RequestManager.requestData('POST', `tasks/${this.activeTaskID}/add-item`, JSON.stringify({ text: value }), {
            'Content-Type': 'application/json'
        });
        response.then((newItem) => {
            let idx = this.activeTaskItems.length;
            this.activeTaskItems.push(newItem);
            this.view.showNewItem(newItem, idx)
        }).catch((err) => console.log(err))
    }

    checkItem(checkBoxIndex, checked) {
        let checkedItem = this.activeTaskItems[checkBoxIndex];
        console.log('checkedItem', checkedItem);
        let response = RequestManager.requestData('PUT', `tasks/${checkedItem._id}/`, JSON.stringify({ completed: checked }), {
            'Content-Type': 'application/json'
        });
        response.then(() => console.log('check status saved')).catch((err) => console.log(err));
    }

    searchItem(searchedText) {
        let response = RequestManager.requestData('GET', 'tasks/search', null, {}, { content: searchedText, taskId: this.activeTaskID });
        response.then((searchedItems) => {
            console.log('searchedItems', searchedItems);
            // let items = searchedItems.find((taskId) => (taskId._id === this.activeTaskID));
            this.activeTaskItems = searchedItems;
            this.view.recreateTaskItems(searchedItems)
        }).catch((err) => console.log(err))
    }

}