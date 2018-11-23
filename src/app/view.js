export default class View {
    constructor(delegate) {
        this.delegate = delegate;
        this.form = document.querySelector("#loginform");

        this.username = '';
        this.init();
    }
    init() {
        this.form.onsubmit = ((event) => {
            event.preventDefault();
            var formData = new FormData(this.form);
            this.delegate.loginRequest(formData);
        });
    }

    showPage2Content(items, userTasks, username) {
        this.username = username;
        var child = document.body.querySelector('.page-1');
        document.body.removeChild(child);

        var fragment = document.createDocumentFragment();
        let divEl = this.createChildNode(fragment, 'div', 'flex-container page-2');
        let mainEl = this.createChildNode(divEl, 'main', 'flex-item-3 left-card-2 blue-bg');
        let h2El = this.createChildNode(mainEl, 'h2', 'user-content', username);
        h2El.addEventListener('click', (event) => this.delegate.logout());
        h2El.addEventListener('mouseover', (event) => this.showLogoutMessage(event));
        h2El.addEventListener('mouseout', (event) => this.showUserName(event));
        let taskNodes = this.createTasks(userTasks);
        mainEl.appendChild(taskNodes);

        let addTaskEl = this.createChildNode(mainEl, 'input', 'add-task-input', null, { type: 'text' })
        let addTaskBtnEl = this.createChildNode(mainEl, 'button', 'button-task button-style-1', 'Add Task');
        addTaskBtnEl.addEventListener('click', (event) => this.addTaskButtonEvent(event));
        addTaskBtnEl.addEventListener('mouseover', (event) => this.showAddTaskInput(event));
        divEl.addEventListener('mouseup', (event) => this.hideInputDialogs(event));

        let asideEl = this.createChildNode(divEl, 'aside', 'flex-item-4 right-card-2');
        let headerEl = this.createChildNode(asideEl, 'header');
        let hEl = this.createChildNode(headerEl, 'h2', null, 'To-do List');
        let searchEl = this.createChildNode(headerEl, 'input', 'search-input', null, { type: 'text' }, { placeholder: 'Search' })

        let searchBtnEl = this.createChildNode(headerEl, 'button', 'button-search  button-style-1', 'Search');
        searchBtnEl.addEventListener('click', (event) => this.searchForString(event));

        let sectionEl = this.createChildNode(asideEl, 'section', 'items-section');
        sectionEl.addEventListener('click', (event) => this.taskItemDone(event));
        let itemsChildNodes = this.createTaskItems(items);
        sectionEl.appendChild(itemsChildNodes);
        let addItemBtnEl = this.createChildNode(asideEl, 'button', 'button-add', '+');
        addItemBtnEl.addEventListener('click', (event) => this.showAddItemView(event));
        let addItemDiv = this.createChildNode(addItemBtnEl, 'div', 'add-item-dialog');
        let addItemEl = this.createChildNode(addItemDiv, 'input', 'add-item-input', null, { type: 'text' })
        document.body.appendChild(fragment);
    }

    showLogoutMessage(event) {
        event.target.textContent = 'Logout';
    }

    showUserName(event) {
        event.target.textContent = this.username;
    }

    searchForString(event) {
        event.preventDefault();
        let itemSearchInput = document.body.querySelector('.search-input');
        this.delegate.searchItem(itemSearchInput.value);
        itemSearchInput.value = '';
    }


    addTaskButtonEvent(event) {
        event.preventDefault();
        let addtaskInput = document.body.querySelector('.add-task-input');
        if (!addtaskInput.value) return;
        this.delegate.createTask(addtaskInput.value);
        addtaskInput.value = '';
    }

    showAddItemView(event) {
        event.preventDefault();
        var dialog = document.body.querySelector('.add-item-dialog');
        var input = document.body.querySelector('.add-item-input');
        var addBtn = document.body.querySelector('.button-add');

        if (input.isEqualNode(event.target)) return;

        if (addBtn.isEqualNode(event.target) && dialog.classList.contains('show-dialog')) {
            if (input.value) {
                this.delegate.createItem(input.value)
                this.hideDialog();
            }
            return;
        }
        this.showDialog();
    }

    hideDialog() {
        var dialog = document.body.querySelector('.add-item-dialog');
        var input = document.body.querySelector('.add-item-input');
        dialog.classList.add('hide-dialog');
        dialog.classList.remove('show-dialog');
        input.classList.add('hide-add-item-input');
        input.classList.remove('show-add-item-input');
    }

    showDialog() {
        var dialog = document.body.querySelector('.add-item-dialog');
        var input = document.body.querySelector('.add-item-input');
        input.classList.remove('hide-add-item-input');
        input.classList.add('show-add-item-input');
        dialog.classList.remove('hide-dialog');
        dialog.classList.add('show-dialog');
    }

    showAddTaskInput(event) {
        event.preventDefault();
        let addTaskInput = document.body.querySelector('.add-task-input');
        addTaskInput.classList.remove('hide-input');
        addTaskInput.classList.add('show-input');
    }

    hideInputDialogs(event) {
        event.preventDefault();
        var taskInput = document.body.querySelector('.add-task-input');
        if (!taskInput.isEqualNode(event.target) && taskInput.classList.contains('show-input')) {
            taskInput.classList.add('hide-input');
            taskInput.classList.remove('show-input');
        }
    }

    createTaskItems(taskItems) {
        var taskFragment = document.createDocumentFragment();
        let ulEl = this.createChildNode(taskFragment, 'ul', 'items-list');
        var i = 0;
        for (let { _id, title, completed } of taskItems) {
            let childNode = document.createElement('li');
            childNode.className = 'checkbox';
            childNode.innerHTML = `<input  type='checkbox' data-index=${i} ${completed ? 'checked' : ''} id = 'checkbox-${i}'><label for='checkbox-${i}'>${title}</label>`;
            ulEl.appendChild(childNode);
            i++;
        }
        return taskFragment;
    }

    recreateTaskItems(taskItems) {
        var fragment = document.createDocumentFragment();
        let sectionEl = document.body.querySelector('.items-section');
        let elEl = sectionEl.querySelector('.items-list');
        elEl ? sectionEl.removeChild(elEl) : false;
        console.log('recreateTaskItems', taskItems);
        var itemsChildNodes = this.createTaskItems(taskItems);
        fragment.appendChild(itemsChildNodes);
        sectionEl.appendChild(fragment);
    }

    createTasks(tasks) {
        var taskFragment = document.createDocumentFragment();
        let navEl = this.createChildNode(taskFragment, 'nav');
        let ulEl = this.createChildNode(navEl, 'ul', 'user-tasks');
        ulEl.addEventListener('click', (event) => {
            event.preventDefault();
            this.delegate.onTaskLinkClick(event);
        });
        console.log(tasks);
        for (let { _id, title } of tasks) {
            let childNode = document.createElement('li');
            childNode.innerHTML = `<a href = tasks/${_id}/items>${title}</a>`;
            ulEl.appendChild(childNode);
        }
        return taskFragment;
    }

    showNewTask(task) {
        console.log('task added', task);
        let ulEl = document.body.querySelector('.user-tasks');
        let childNode = document.createElement('li');
        childNode.innerHTML = `<a href = tasks/${task._id}/items>${task.title}</a>`;
        ulEl.appendChild(childNode);
    }

    showNewItem(item, index) {
        console.log('item added', item);
        let ulEl = document.body.querySelector('.items-list');
        let childNode = document.createElement('li');
        childNode.className = 'checkbox';
        childNode.innerHTML = `<input  type='checkbox' data-index=${index} ${item.completed ? 'checked' : ''} id = 'checkbox-${index}'><label for='checkbox-${index}'>${item.title}</label>`;
        ulEl.appendChild(childNode);
    }

    createChildNode(parent, el, cls, text, ...attributes) {
        console.log('attributes', ...attributes);
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

    taskItemDone(event) {
        // event.preventDefault();
        if (event.target.getAttribute('type') !== 'checkbox') return;
        let checked = event.target.checked;
        let checkBoxIndex = event.target.dataset.index;
        this.delegate.checkItem(checkBoxIndex, checked);
    }
}