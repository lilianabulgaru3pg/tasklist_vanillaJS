import style from "./main.css";

window.addEventListener("load", function () {
    function sendData() {
        var xhr = new XMLHttpRequest();
        var formData = new FormData(form);

        xhr.addEventListener("load", function (event) {
            alert(event.target.responseText);
        });
        xhr.addEventListener("error", function (event) {
            alert('Oops! Something went wrong.');
        });

        xhr.open("POST", "http://localhost:8080/user-tasks", true);
        xhr.send(formData);
    }

    var form = document.getElementById("loginform");
    console.log(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        sendData();
    });
});