
window.onload = () => {
    /* 获取所有的group */
    axios.get('https://qct5x4.api.cloudendpoint.cn/insertGroup', {
        params: {
            email: useremail,
        }
    }).then((res) => {
        console.log(res.data);
        res.data.forEach(group => {
            let { index, groupName } = group;
            createGroup(index, groupName);
            groupaddevents();
            removeallstate()
            hideall();
        })
    }).catch((e) => {
        console.log(e);
    })
    setTimeout(() => {
        /* 返回列表数据 */
        axios.get('https://qct5x4.api.cloudendpoint.cn/inserLists', {
            params: {
                email: useremail,
            }
        }).then(function (response) {
            let userdata = response.data;
            let Arr = userdata.emailuserinfo;
            /* 创建列表 */
            console.log(Arr);
            for (let i = 0; i < Arr.length; i++) {
                let { title, index, groupIndex } = Arr[i];
                createlist();
                if (groupIndex != -1) {
                    let target = Array.from(lists)[i];
                    target.querySelector('.title').innerHTML = title;
                    target.setAttribute('dex', index)
                    console.log(index);
                    Array.from(groupitems)[groupIndex].querySelector('.grouplistarea').append(target);
                }
                else {
                    console.log(index);
                    Array.from(lists)[i].setAttribute('dex', index)
                    Array.from(lists)[i].querySelector('.title').innerHTML = title;
                }


            }
            console.log('2')
            console.log(Array.from(lists));
            Array.from(lists)[lists.length - 1].click();
            document.querySelector('.infoleft').innerHTML = '';
        })
            .catch(function (error) {
                console.log(error);
            });
    }, 100);

    setTimeout(() => {
        /* 获取taskItem信息 */
        axios.get('https://qct5x4.api.cloudendpoint.cn/insertItems', {
            params: {
                email: useremail,
            }
        })//创建taskItem
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
                hideall();
            })
            .catch(function (e) {
                console.log(e);
            })
    }, 150)



}
/* 设置用户名称 */
let str = window.location.search
let userdata = new URLSearchParams(str);
let userinfo = document.querySelector('.userinfo');
let useremail = userdata.get('email')
userinfo.innerHTML = useremail
/* 修改list数据函数 */
let changelistdata = (action, dex, content, groupIndex) => {
    /* 注意Json数据格式 */
    setTimeout(() => {
        axios.post('https://qct5x4.api.cloudendpoint.cn/chagelists', {
            email: useremail,
            title: content,
            index: dex,
            act: action,
            groupIndex: Number(groupIndex),
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


let changeGroupData = (email, index, groupName, action) => {
    axios.post('https://qct5x4.api.cloudendpoint.cn/changeGroup', {
        email: email,
        index: Number(index),
        groupName: groupName,
        action: action
    }).then((res) => {
        console.log(res)
    })
        .catch((e) => {
            console.log(e)
        })
}