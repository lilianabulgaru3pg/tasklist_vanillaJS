import { user } from "../model/model.js"
export default class View {
    constructor() {
        console.log('view');
    }

    showPage2Content(tasks) {
        console.log('showPage2Content');
        var child = document.body.getElementsByClassName('page-1');
        document.body.removeChild(child[0]);

        var fragment = document.createDocumentFragment();
        let divEl = this.createChildNode(...[fragment, 'div', 'flex-container page-2']);
        let mainEl = this.createChildNode(...[divEl, 'main', 'flex-item-3 left-card-2 blue-bg']);
        let h2El = this.createChildNode(...[mainEl, 'h2', 'user-content', user.name]);
        let taskNodes = this.createTasks(tasks);
        mainEl.appendChild(taskNodes);
        let addTaskBtnEl = this.createChildNode(...[mainEl, 'button', 'button-task button-style-1', 'Add Task']);

        let asideEl = this.createChildNode(...[divEl, 'aside', 'flex-item-4 right-card-2']);
        let headerEl = this.createChildNode(asideEl, 'header');
        let hEl = this.createChildNode(...[headerEl, 'h2', null, 'Task Name']);
        let searchEl = this.createChildNode(...[headerEl, 'input', 'search-input', null, { type: 'text' }, { placeholder: 'Search' }])
        let searchBtnEl = this.createChildNode(...[headerEl, 'button', 'button-search  button-style-1', 'Search']);
        let sectionEl = this.createChildNode(asideEl, 'section');
        sectionEl.addEventListener('click', this.taskItemDone);
        let itemsEl = this.createTaskItems([{ title: 'first task', completed: true }]);
        sectionEl.appendChild(itemsEl);
        let addItemBtnEl = this.createChildNode(...[sectionEl, 'button', 'button-add', '+']);

        document.body.appendChild(fragment);
    }

    createTaskItems(taskItems) {
        var taskFragment = document.createDocumentFragment();
        let ulEl = this.createChildNode(taskFragment, 'ul');
        var i = 0;
        for (let { title, completed } of taskItems) {
            let childNode = document.createElement('li');
            childNode.className = 'checkbox';
            childNode.innerHTML = `<input  type='checkbox' data-index=${i} ${completed ? 'checked' : ''} id = 'checkbox-${i}'><label for='checkbox-${i}'>${title}</label>`;
            ulEl.appendChild(childNode);
        }
        return taskFragment;
    }

    taskItemDone() {

    }

    createTasks(tasks) {
        var taskFragment = document.createDocumentFragment();
        let navEl = this.createChildNode(taskFragment, 'nav');
        let ulEl = this.createChildNode(navEl, 'ul');
        for (let { id, title } of tasks) {
            let childNode = document.createElement('li');
            childNode.innerHTML = `<a href =#${title}>${title}</a>`;
            ulEl.appendChild(childNode);
        }
        return taskFragment;
    }

    createChildNode(parent, el, cls, text, ...attributes) {
        var childNode = document.createElement(el);
        cls ? childNode.className = cls : false;
        text ? childNode.textContent = text : false;

        attributes.forEach(function ({ key, value }) {
            console.log(key, value);
            childNode.setAttribute(`${key}`, `${value}`)
        });
        parent.appendChild(childNode);
        return childNode;
    }
}