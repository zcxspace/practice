

window.onload = () => {
    axios.get('https://qct5x4.api.cloudendpoint.cn/inserLists', {
        params: {
            email: useremail,
        }
    }).then(function (response) {
        let userdata = JSON.parse(JSON.stringify(response.data));
        console.log(userdata.emailuserinfo)
        let Arr = userdata.emailuserinfo;
        for (let i = 0; i < Arr.length; i++) {
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
    axios.get('https://qct5x4.api.cloudendpoint.cn/insertItems', {
        params: {
            email: useremail,
        }
    })
        .then(function (res) {
            let itemInfoArr = res.data.itemInfo;
            itemInfoArr.forEach(item => {

                let { content, datastr, index, innerdex, state } = item;

                console.log(content, datastr, index, innerdex, state);

                console.log();
                createtask(index, datastr, content);

                if (state == 'done') {
                    let innerArr = Array.from(areas)[index].getElementsByClassName('taskitem');
                    Array.from(innerArr)[innerdex].querySelector('.done').click();
                }


            })

        })
}
/* 设置用户名称 */
let str = window.location.search
let userdata = new URLSearchParams(str);
let userinfo = document.querySelector('.userinfo');
let useremail = userdata.get('email')
userinfo.innerHTML = useremail
/* 修改list数据函数 */
let changelistdata = (action, dex, content) => {
    /* 注意Json数据格式 */
    let index = String(dex);
    let act = action;
    let title = content;

    setTimeout(() => {
        axios.post('https://qct5x4.api.cloudendpoint.cn/Lists', {
            email: useremail,
            title: title,
            index: index,
            act: act
        })
    }, 0)

}

/* 修改item数据函数 */
let chageItemData = (email, index, content, datastr, taskinnerdex, action, state) => {
    axios.post('https://qct5x4.api.cloudendpoint.cn/chagetaskitem', {
        email: email,
        index: String(index),
        content: content,
        datastr: datastr,
        innerdex: taskinnerdex,
        action: action,
        state: state,
    })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (e) {
            console.log(e)
        })
    console.log('调用了一次')
}
