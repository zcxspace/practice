

window.onload = () => {
    axios.get('https://qct5x4.api.cloudendpoint.cn/inserLists', {
        params: {
            email: useremail,
        }
    }).then(function (response) {
        let userdata = JSON.parse(JSON.stringify(response.data));
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

    setTimeout(() => {
        axios.get('https://qct5x4.api.cloudendpoint.cn/insertItems', {
            params: {
                email: useremail,
            }
        })
            .then(function (res) {
                let itemInfoArr = res.data.itemInfo;

                itemInfoArr.forEach(item => {
                    let { content, datastr, index, innerdex, state } = item;
                    /* 创建task */
                    createtask(index, datastr, content);
                    /* 定义任务隐藏区 */
                    let innerarea = Array.from(areas)[index].querySelector('.hasdonearea');

                    let innerArr = Array.from(areas)[index].getElementsByClassName('taskitem');

                    Array.from(innerArr)[0].setAttribute('lastdex', innerdex);

                    if (state == 'done') {
                        innerarea.style.opacity = 1;
                        innerarea.after(Array.from(innerArr)[0]);
                        Array.from(innerArr)[0].querySelector('.done').classList.add('change')
                        Array.from(innerArr)[0].querySelector('.done').firstElementChild.classList.add('fontchange')
                        Array.from(innerArr)[0].querySelector('.done').nextElementSibling.classList.add('linethrough');
                        Array.from(innerArr)[0].setAttribute('lastdex', innerdex);
                        Array.from(innerArr)[0].setAttribute('done', '');
                        Array.from(lists)[index].click();

                    }
                    getalldone();
                })

            })
            .catch(function (e) {
                console.log(e);
            })
    }, 0)

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
