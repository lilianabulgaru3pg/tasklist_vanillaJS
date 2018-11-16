// import style from "./main.css";
// import fetch from "node-fetch";

window.addEventListener("load", function () {
    var taskItem = {
        _id: '',
        text: "first task",
        completed: false
    }
    var user = {
        name: '',
        tasks: [{
            id: '',
            title: '',
            items: []
        }]
    };

    async function postData() {
        try {
            var formData = new FormData(form);
            var response = await window.fetch('http://localhost:8080/user-tasks', {
                method: 'POST',
                body: formData
            });

            if (response.status === 200) {
                const responseBody = await response.json();
                user.name = document.getElementById("username").value;
                user.tasks = responseBody;
                page2Content();
            }
        } catch (err) {
            console.log(err);
        }
    }

    var pages = {
        page1: {
            title: "Login Page",
            content: "index.html"
        },
        page2: {
            title: "User Tasks",
            content: page2Content
        }
    }
    var form = document.getElementById("loginform");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        postData();
    });

    function page1Content() {

    }

    // page2Content();

    function page2Content() {
        let tasks = user.tasks;
        history.pushState({}, "user-task", "user-task");
        var child = document.body.getElementsByClassName('page-1');
        document.body.removeChild(child[0]);

        var fragment = document.createDocumentFragment();
        let divEl = createChildNode(...[fragment, 'div', 'flex-container page-2']);
        let mainEl = createChildNode(...[divEl, 'main', 'flex-item-3 left-card-2 blue-bg']);
        let h2El = createChildNode(...[mainEl, 'h2', 'user-content', user.name]);
        let taskNodes = createTasks(tasks);
        mainEl.appendChild(taskNodes);
        let addTaskBtnEl = createChildNode(...[mainEl, 'button', 'button-task button-style-1', 'Add Task']);

        let asideEl = createChildNode(...[divEl, 'aside', 'flex-item-4 right-card-2']);
        let headerEl = createChildNode(asideEl, 'header');
        let hEl = createChildNode(...[headerEl, 'h2', null, 'Task Name']);
        let searchEl = createChildNode(...[headerEl, 'input', 'search-input', null, { type: 'text' }, { placeholder: 'Search' }])
        let searchBtnEl = createChildNode(...[headerEl, 'button', 'button-search  button-style-1', 'Search']);
        let sectionEl = createChildNode(asideEl, 'section');
        sectionEl.addEventListener('click', taskItemDone);
        let itemsEl = createTaskItems([{ title: 'first task', completed: true }]);
        sectionEl.appendChild(itemsEl);
        let addItemBtnEl = createChildNode(...[sectionEl, 'button', 'button-add', '+']);

        document.body.appendChild(fragment);
    }

    function createTaskItems(taskItems) {
        var taskFragment = document.createDocumentFragment();
        let ulEl = createChildNode(taskFragment, 'ul');
        var i = 0;
        for (let { title, completed } of taskItems) {
            let childNode = document.createElement('li');
            childNode.className = 'checkbox';
            childNode.innerHTML = `<input  type='checkbox' data-index=${i} ${completed ? 'checked' : ''} id = 'checkbox-${i}'><label for='checkbox-${i}'>${title}</label>`;
            ulEl.appendChild(childNode);
        }
        return taskFragment;
    }

    function taskItemDone() {

    }

    function createTasks(tasks) {
        var taskFragment = document.createDocumentFragment();
        let navEl = createChildNode(taskFragment, 'nav');
        let ulEl = createChildNode(navEl, 'ul');
        for (let { id, title } of tasks) {
            let childNode = document.createElement('li');
            childNode.innerHTML = `<a href =#${title}>${title}</a>`;
            ulEl.appendChild(childNode);
        }
        return taskFragment;
    }

    function createChildNode(parent, el, cls, text, ...attributes) {
        var childNode = document.createElement(el);
        cls ? childNode.className = cls : false;
        text ? childNode.textContent = text : false;
        console.log('atrr', attributes)
        attributes.forEach(function ({ key, value }) {
            console.log(key, value);
            childNode.setAttribute(`${key}`, `${value}`)
        });
        parent.appendChild(childNode);
        return childNode;
    }

});

window.addEventListener('popstate', function (event) {

});

window.addEventListener('hashchange', function (event) {
    console.log("hashchange ")
});

