
let email = document.querySelector(".email");
let password = document.querySelector(".password");
let signinbtn = document.querySelector(".signinbtn");

function checkform(obj, reg) {
    obj.onblur = () => {
        // let reg = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
        if (!reg.test(obj.value)) {
            obj.classList.add("invalid");
        }
        else {
            obj.classList.add("valid")
        }
    }
    obj.onfocus = () => {

        if (obj.classList.contains("invalid")) {
            obj.classList.remove("invalid");

        }
        else if (obj.classList.contains("valid")) {
            obj.classList.remove("valid");
        }
    }
}
checkform(email, /[-.\w]+@([\w-\.]+[\w]+)/ig);
checkform(password, /[^\s]{8,}/ig);

signinbtn.onclick = function () {
    axios.post('https://qcej2z.api.cloudendpoint.cn/signin', {
        email: email.value,
        password: password.value,
    }).then(function (res) {
        let nvalue = JSON.stringify(res, ['data', 'msg'])
        alert(nvalue);
    }).catch(function (error) {
        console.log(error);
    });

}