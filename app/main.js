import "./style.css"; // 直接导入,css和js直接打包在一个bundle.js文件
const greeter = require("./Greeter");
document.querySelector("#root").appendChild(greeter());