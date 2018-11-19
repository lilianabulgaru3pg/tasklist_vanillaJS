import style from "./main.css";
import ViewController from "./app/controller"

'use strict';
window.addEventListener("load", function () {
    var viewController = new ViewController();
    window.onpopstate = viewController.onpopstate;
    window.onhashchange = viewController.onhashchange;
});




