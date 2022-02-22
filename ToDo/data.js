

window.onload = () => {
    /* 设置用户名称 */
    let str = window.location.search
    let userdata = new URLSearchParams(str);
    let userinfo = document.querySelector('.userinfo');
    let useremail = userdata.get('email')
    userinfo.innerHTML = useremail
    axios.get('https://qct5x4.api.cloudendpoint.cn/inserLists', {
        params: {
            email: `${useremail}`
        }
    })
        .then(function (response) {
            console.log();
            let userdata = JSON.parse(JSON.stringify(response.data));
            console.log(userdata.emailuserinfo)
            let Arr = userdata.emailuserinfo;
            for (let i = 0; i < Arr.length; i++) {
                console.log(Arr[i]);
                let { title } = Arr[i];
                let { index } = Arr[i];
                createlist();
                Array.from(lists)[i].setAttribute('dex', index)
                Array.from(lists)[i].querySelector('.title').innerHTML = title;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

/* 添加list数据函数 */
let changelistdata = (action, dex, content) => {
    /* 注意Json数据格式 */
    let index = String(dex);
    let act = action;
    let title = content;
    let e = document.querySelector('.userinfo').textContent;

    setTimeout(() => {
        axios.post('https://qct5x4.api.cloudendpoint.cn/Lists', {
            email: e,
            title: title,
            index: index,
            act: act
        })
    }, 0)

}
