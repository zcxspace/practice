const labels = document.querySelectorAll('.inputarea label');
labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, index) => ` <span style="transition-delay: ${index * 50}ms;">${letter}</span>`)
        .join('')
})
let email = document.getElementsByName("email")[0]
let password = document.getElementsByName("password")[0];

let signinbtn = document.querySelector('.login_btn');
signinbtn.onclick = function () {
    axios.post('https://qct5x4.api.cloudendpoint.cn/signin', {
        email: email.value,
        password: password.value,
    }).then(function (res) {
        let nvalue = JSON.stringify(res.data.msg)
        if (nvalue.includes("成功")) {
            alert(nvalue)
            document.forms[0].submit();
        }
        else {
            alert(nvalue);
        }
    }).catch(function (error) {
        console.log(error);
    });
}