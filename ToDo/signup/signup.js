/* 显示所选性别 */
let is = document.querySelector('.radioarea').getElementsByTagName('i');
let labels = document.querySelectorAll('.info');
let email = document.getElementsByName('email')[0];
let emailinfo = email.previousElementSibling
let password = document.getElementsByName('password')[0];
let passwordinfo = password.previousElementSibling;
let genders = document.getElementsByName('gender');
let signupbtn = document.querySelector('.signupbtn');
Array.from(is).forEach(i => {
    i.onclick = () => {
        Array.from(is).forEach(i => i.classList.remove('chose'));
        i.classList.add('chose')
    }
})
Array.from(labels).forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, index) => `<span style="transition-delay:${index * 50}ms ;">${letter}</span>`)
        .join('');
})

let checkform = (obj, infobox, reg) => {
    obj.onblur = () => {
        if (!reg.test(obj.value)) {
            infobox.classList.add('invalid');
        }
        else {
            infobox.classList.add('valid');
        }
    }
    obj.onfocus = () => {
        obj.innerHTML = "";
        if (infobox.classList.contains('invalid')) {
            infobox.classList.remove('invalid')
        }
        else if (infobox.classList.contains('valid'))
            infobox.classList.remove('valid')
    }
}

let getgender = () => {
    for (let i = 0; i < genders.length; i++) {
        if (Array.from(genders)[i].checked) {
            return Array.from(genders)[i].value;
        }
    }
}
checkform(email, emailinfo, /[-.\w]+@([\w-]+\.)+[\w-]+/gi);
checkform(password, passwordinfo, /[^\s]\w{7,10}/gi);


signupbtn.onclick = function () {
    axios.post('https://qct5x4.api.cloudendpoint.cn/signup', {
        email: email.value,
        password: password.value,
        gender: getgender(),
    }).then(function (res) {
        let value = JSON.stringify(res, ['data', 'msg'])
        alert(value);
    }).catch(function (error) {
        console.log(error);
    });

}