window.onload = () => {
    /* 设置用户名称 */
    let str = window.location.search
    let userdata = new URLSearchParams(str);
    let userinfo = document.querySelector('.userinfo');
    userinfo.innerHTML = userdata.get('email')
}