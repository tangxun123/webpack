// 注: 由于webpack3.*/webpack2.*已经内置可处理JSON文件，这里我们无需再添加webpack1.*需要的json-loader
let config = require("./config.json");
module.exports = function(){
    var greet = document.createElement("div");
    greet.className = "color"
    // greet.textContent = "Hi there and greetings!"; // 单独打包js文件
    let obj = {a:"i am es6 methods",b:2,c:3};
    let {a} = obj;
    let set = [...new Set([1,2,3,4,3,2,1])];
    greet.textContent = config.greetText + "~" + a + JSON.stringify(set); // 打包json文件 + es6 拼接字符串
    return greet;
}