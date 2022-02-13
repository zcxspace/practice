// const { default: axios } = require("axios");

let email = document.querySelector("#email");
let erroremail = document.querySelector(".error-email");
let password = document.querySelector('.password')
let errorpassword = document.querySelector(".error-password");
let nickname = document.querySelector("#nickname");
let errornickname = document.querySelector(".error-nickname");
let genders = document.getElementsByName("gender");
let signupbtn = document.querySelector(".signupbtn");

function checkform(obj, objerrorbox, reg) {
    obj.onblur = () => {
        // let reg = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
        if (!reg.test(obj.value)) {
            obj.classList.add("invalid");
            objerrorbox.innerHTML = "格式错误"
        }
        else {
            obj.classList.add("valid")
            objerrorbox.innerHTML = "格式正确";
        }
    }
    obj.onfocus = () => {
        objerrorbox.innerHTML = "";

        if (obj.classList.contains("invalid")) {
            obj.classList.remove("invalid");

        }
        else if (obj.classList.contains("valid")) {
            obj.classList.remove("valid");
        }
    }
}

function getradiovalue() {
    for (let i = 0; i < genders.length; i++) {
        if (genders[i].checked) {
            return genders[i].value;
        }
    }
}
checkform(email, erroremail, /[-.\w]+@([\w-]+\.)+[\w-]+/gi);
checkform(password, errorpassword, /[^\s]\w{7,}/gi);
checkform(nickname, errornickname, /[^\s]+/ig)

signupbtn.onclick = function () {
    axios.post('https://qcej2z.api.cloudendpoint.cn/signup', {
        email: email.value,
        password: password.value,
        nickname: nickname.value,
        gender: getradiovalue(),
    }).then(function (res) {
        let value = JSON.stringify(res, ['data', 'msg'])
        alert(value);
    }).catch(function (error) {
        console.log(error);
    });

}
