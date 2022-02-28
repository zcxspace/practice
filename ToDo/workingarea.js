// const { default: axios } = require("axios");

let addlist = document.querySelector('#addlist')
let diyarea = document.querySelector('.diyarea')
let lists = diyarea.getElementsByClassName('listitem');
let areas = document.getElementsByClassName('taskarea');
let infoleft = document.querySelector('.infoleft');
let mydayinfo = document.querySelector('.mydayinfo');
let addtaskarea = document.querySelector('.addtaskarea');
let inputs = addtaskarea.getElementsByClassName('taskinput');
let addtaskitembtns = addtaskarea.getElementsByClassName('addtaskitem');
let menus = document.getElementsByClassName('taskmenu');
let mask = document.querySelector('.mask')
let groupitems = document.getElementsByClassName('groupitem');
/* 创建分组变量 */
let addgroup = document.querySelector('.addgroup');
let grouplidemenus = document.getElementsByClassName('grouplidemenu');
let itemMenus = document.getElementsByClassName('itemMenu');
let movetoitems = document.getElementsByClassName('movetoitem');
let target;//list当前点击元素的目标target
let hasdoneareas = document.getElementsByTagName('hasdonearea');
/* 获取所有 其他按钮 */
let othersbtn = document.querySelectorAll('#others');
let othersmenu = myday.querySelector('.taskmenu');
let changethemebtn = document.querySelector('.changetheme');
let thememune = document.querySelector('.thememune');

/* 给其他按钮绑定函数 */
othersbtn.forEach(btn => {
    btn.addEventListener('click', () => {
        if (othersmenu.style.display == "block") {
            othersmenu.style.display = "none"
        }
        else {
            othersmenu.style.display = "block";
        }
    })
})

/* 改变主题按钮 */
changethemebtn.addEventListener('click', () => {
    othersmenu.style.display = "none";
    thememune.style.display = "block";
})
document.body.onclick = (e) => {
    if (!e.target.hasAttribute('themebtn')) thememune.style.display = "none";
}
let as = document.querySelector('.thememune').getElementsByTagName('a');
/* 变换背景函数 */
let changeback = (e) => {
    let href = e.target.getAttribute('href');
    TODO.style.backgroundImage = `url(${href})`
    e.preventDefault();
}
Array.from(as).forEach(a => a.addEventListener('click', changeback));
/* 给a链接加上背景 */
for (let i = 0; i < as.length; i++) {
    let href = Array.from(as)[i].getAttribute('href');
    Array.from(as)[i].style.backgroundImage = `url(${href})`;
    Array.from(as)[i].setAttribute('themebtn', '');
}

/* 获取所有任务按钮函数 */
let getalldone = () => {
    let dones = document.getElementsByClassName('done')
    Array.from(dones).forEach(done => {
        done.addEventListener('click', addstate);
    })

}

/* 阻止鼠标右键默认事件 */
document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
})
/* 搜索模块 */
let searchbtn = document.querySelector('#searchbtn');
let searchinput = document.querySelector('#searchinput');
let searcharea = document.querySelector('.search-area');
/* 获取所有的任务条 */
let alltasks = document.getElementsByClassName('taskitem')
let alltasksarea = document.querySelector('.taskitem-area');
let searchtasks = alltasksarea.getElementsByClassName('taskitem');

/* 创建备忘录函数 */
let createpad = () => {
    let deadline = document.querySelector('.deadline');
    let pad = `<textarea name="pad" id="pad" placeholder="点击输入备忘..."></textarea>`
    deadline.insertAdjacentHTML('afterend', pad);
}
let pads = document.getElementsByName('pad')

/* updatesbarea */
let updatesbarea = (e) => {
    let task = e.target.parentNode
    let taskvalue = document.querySelector('.taskvalue');
    let date = document.querySelector('.date');
    Array.from(pads).forEach(pad => pad.style.display = 'none');
    let index = Array.from(alltasks).indexOf(task)
    Array.from(pads)[index].style.display = 'block';
    Array.from(pads).forEach(pad => {
        pad.style.height = task.scrollHeight + 'px';
    })
    date.innerText = `创建于:${task.dataset.date}`;
    taskvalue.innerHTML = task.innerText;
}


/* 显示隐藏搜索模块函数 */
let showsearcharea = (e) => {
    if (e.target.value) {
        searcharea.style.display = "block"
    }
    else {
        searcharea.style.display = "none"
    }

}
/* 过滤任务条函数 */
let filtertask = (e) => {
    Array.from(searchtasks).forEach(task => {
        if (task.innerText.includes(e.target.value)) {
            task.style.display = "block";
        }
        else task.style.display = "none"
    })
}
/* 隐藏并清除搜索模块 */
let clearsearch = () => {
    searcharea.style.display = "none";
    searchinput.value = '';
    alltasksarea.innerHTML = '';
}
/* 获取所有任务条函数 */
let getalltask = () => {
    /* 新建所有的副本 */
    Array.from(alltasks).forEach(task => {
        let newtask = `<div class="taskitem">${task.innerHTML}</div>`;
        alltasksarea.insertAdjacentHTML('beforeend', newtask);
    })
}
let search = document.getElementById('#searchbtn');
searchbtn.onclick = () => { searchinput.focus() };
searchinput.addEventListener('focus', getalltask);
searchinput.addEventListener('input', showsearcharea);
searchinput.addEventListener('input', filtertask);

/* 隐藏所有list清除info函数 */
let hideall = () => {
    Array.from(areas).forEach(obj => obj.classList.add('hide'))
    Array.from(addtaskitembtns).forEach(obj => obj.classList.add('hide'))
    Array.from(inputs).forEach(obj => obj.classList.add('hide'))
    infoleft.innerText = '';
}

/* 键盘触发添加任务函数 */
let addtaskbykey = (e) => {
    let index = Array.from(inputs).indexOf(e.target);
    if (e.code == "Enter") {
        Array.from(addtaskitembtns)[index].click();
        e.target.value = ''
    }
}

/* 为list绑定event函数 */
let listaddevents = () => {
    Array.from(lists).forEach(list => { list.addEventListener('click', updatenum) })
    Array.from(addtaskitembtns).forEach(btn => { btn.addEventListener('click', addtask) })
    Array.from(inputs).forEach(input => input.addEventListener('keyup', addtaskbykey))
    Array.from(lists).forEach(list => { list.addEventListener('contextmenu', listclickstate) })
    Array.from(lists).forEach(list => { list.addEventListener('click', listclickstate) })
    Array.from(lists).forEach(list => { list.addEventListener('click', addtitle) })
    Array.from(lists).forEach(list => { list.addEventListener('click', clearsearch) })
    Array.from(lists).forEach(list => { list.addEventListener('contextmenu', addtitle) })
    Array.from(lists).forEach(list => { list.addEventListener('contextmenu', showlistmenu) })
    Array.from(lists)[lists.length - 1].click();
}


/* 更新当前任务条数目函数 */
let updatenum = (e) => {
    let index = Array.from(lists).indexOf(e.target);
    let taskArr = Array.from(areas)[index].getElementsByClassName('taskitem');
    let arr = []
    Array.from(taskArr).forEach(task => {
        if (!task.hasAttribute('done')) {
            arr.push(task);
        }
    })
    if (arr.length) {
        Array.from(lists)[index].querySelector('.counter').innerHTML = arr.length;
    }
    else Array.from(lists)[index].querySelector('.counter').innerHTML = '';
}
/* removeall list state 函数 */
let removeallstate = () => {
    Array.from(lists).forEach(list => list.classList.remove('active'))

}
/* 为当前list添加状态 */
let listclickstate = (e) => {
    removeallstate()
    e.target.classList.add('active');
}
/* 为group绑定event函数 */
let groupaddevents = () => {
    Array.from(groupitems).forEach(item => item.addEventListener('contextmenu', showgroupmenu));
    Array.from(groupitems).forEach(item => item.querySelector('.row1').addEventListener('click', setgroupstate));
    Array.from(groupitems).forEach(item => item.querySelector('.row1').addEventListener('click', hideall));
    Array.from(groupitems).forEach(item => item.querySelector('.row1').addEventListener('click', removeallstate));
}
/* 展开/关闭分组函数 */
let setgroupstate = (e) => {
    if (!e.target.hasAttribute('data-id')) return;
    e.target.querySelector('.iconbox').classList.toggle('rotate90deg')
    e.target.parentNode.classList.toggle('open');
}
/* 删除页面所有菜单函数 */
let randomdel = (arrlike) => {
    Array.from(arrlike).forEach(menu => menu.remove());
}

/* 重命名函数 */
let rename = (clicktarget) => {
    let title = clicktarget.querySelector('.title').innerText;
    let input = document.createElement('input');
    input.classList.add('listinput')
    let beforetitle = clicktarget.querySelector('.title')
    input.value = title;
    beforetitle.replaceWith(input);
    input.focus();
    input.select();
    if (clicktarget.hasAttribute('lastdex')) {
        input.onblur = function () {
            beforetitle.innerText = this.value;
            this.replaceWith(beforetitle);
            /* 修改item数据 */
            console.log(this)
            let index = Array.from(areas).indexOf(clicktarget.parentNode);
            let innerdex = clicktarget.getAttribute('lastdex');
            chageItemData(useremail, index, this.value, "null", Number(innerdex), "修改item内容", "state");
        }
    }
    if (clicktarget.hasAttribute('data-listid')) {
        input.onblur = function () {
            beforetitle.innerText = this.value;
            let dex = clicktarget.getAttribute('dex');
            changelistdata("修改数据", Number(dex), this.value);
            this.replaceWith(beforetitle);
            clicktarget.click();
        }
    }
    else {
        input.onblur = function () {
            beforetitle.innerText = this.value;
            this.replaceWith(beforetitle);
            let index = clicktarget.getAttribute('dex');
            /* 添加group数据 */
            changeGroupData(useremail, Number(index), this.value, "添加分组");
        }
    }
}

/* group右键显示菜单函数 */
let showgroupmenu = (e) => {
    if (!e.target.hasAttribute('data-id')) return;
    document.body.click();
    removeallstate()
    let clicktarget = e.target;
    randomdel(grouplidemenus)

    let gmenu = `<div class="grouplidemenu">
                    <button class="grename">重新命名</button>
                    <button class="canselg">取消分组</button>
                </div>`
    document.body.insertAdjacentHTML('afterbegin', gmenu);

    let grouplidemenu = document.querySelector('.grouplidemenu');
    resetposition(grouplidemenu, e, 5, 5);
    /* 随机点击删除所有菜单 */
    document.body.addEventListener("click", () => { randomdel(grouplidemenus) });
    /* 重命名函数 */
    let grename = document.querySelector('.grename');
    grename.addEventListener('click', () => { rename(clicktarget) })
    /* 取消分组函数 */
    let canselg = document.querySelector('.canselg');
    canselg.addEventListener('click', () => { removeoutfun(clicktarget) });

    e.preventDefault();
}
/* taskItem右键显示菜单函数 */
let showItemMenu = (e) => {
    document.body.click();
    let clicktarget = e.target;
    let itemMenu = `<div class="itemMenu">
                    <button class="changeItem">修改任务</button>
                    <button class="delItem">删除任务</button>
                </div>`
    document.body.insertAdjacentHTML('afterbegin', itemMenu);
    let itemMenuElement = document.querySelector('.itemMenu');
    resetposition(itemMenuElement, e, 5, 5);
    document.body.addEventListener("click", () => { randomdel(itemMenus) });
    /* 修改任务内容函数 */
    let changeItem = document.querySelector('.changeItem')
    changeItem.addEventListener('click', () => { rename(clicktarget) })
    // clicktarget.remove();
    // console.log(clicktarget);
    let delItem = document.querySelector('.delItem');
    delItem.addEventListener('click', () => { delTaskItem(clicktarget) })

}

/* 删除单条taskItem函数 */
let delSigleItem = (target) => {
    let innerdex = target.getAttribute('lastdex');
    let index = Array.from(areas).indexOf(target.parentNode);
    chageItemData(useremail, index, "", "", Number(innerdex), "删除单条item", "");
    target.remove();

}
/* 取消分组函数 */
let removeoutfun = (clicktarget) => {
    /* 获取list容器的list数量 */
    let dex = clicktarget.parentNode.getAttribute('dex');
    let listnum = clicktarget.nextElementSibling.childElementCount;
    if (listnum) {
        changelistdata("清除分组下标", -1, null, Number(dex));
        let innerlists = clicktarget.nextElementSibling.getElementsByClassName('listitem');
        Array.from(innerlists).forEach(list => { diyarea.prepend(list) });
        clicktarget.parentNode.remove();
    }
    else {
        clicktarget.parentNode.remove();
    }
    let index = clicktarget.parentNode.getAttribute('dex');
    changeGroupData(useremail, index, null, "删除分组");
}

/* list移动进分组函数 */
let removeinfun = (e) => {
    /* 获取点击菜单的对应下标 */
    let movetoindex = Array.from(movetoitems).indexOf(e.target);
    console.log(Array.from(groupitems)[movetoindex]);

    let groupDex = Array.from(groupitems)[movetoindex].getAttribute('dex');
    console.log(groupDex);
    console.log(target)
    let index = Array.from(lists).indexOf(target)
    console.log(index);

    changelistdata("添加分组下标", index, null, Number(groupDex));

    Array.from(groupitems)[movetoindex].querySelector('.grouplistarea').append(target);
    hideall();
    removeallstate()
}


/* list右键显示菜单函数 */
let showlistmenu = (e) => {
    document.body.click();
    target = e.target;
    console.log(target)
    randomdel(menus);
    let menu = `<div class="taskmenu">
                    <button class="remove">将列表移动到...</button>
                    <button class="rename">重新命名</button>
                    <button class="delete">删除改列表</button>
                </div>`
    document.body.insertAdjacentHTML('afterbegin', menu);
    let taskmenu = document.querySelector('.taskmenu');
    /* 删除 */

    let del = document.querySelector('.delete');
    del.addEventListener('click', () => { dellist(target) })

    resetposition(taskmenu, e, 5, 5);

    /* 随机左键取消菜单 */
    document.body.addEventListener("click", () => { randomdel(menus) });

    /* 重命名 */
    let renamebtn = taskmenu.querySelector('.rename');
    renamebtn.addEventListener('click', () => { rename(target) });

    /* 创建“分组“菜单 */
    creategroupsmene()

    /* 移动分组 */
    Array.from(movetoitems).forEach(item => item.addEventListener('click', removeinfun))

    e.preventDefault()

}


/* 显示分组菜单函数 */
let creategroupsmene = () => {
    let groupmenu = document.createElement('div');
    groupmenu.classList.add('groupmenu')
    for (let i = 0; i < groupitems.length; i++) {
        let item = `<button class="movetoitem">${Array.from(groupitems)[i].querySelector('.title').innerText}</button>`
        groupmenu.insertAdjacentHTML('beforeend', item);
    }
    /* 判断diyarea区域中是否含有分组 */
    if (groupmenu.childElementCount) {
        document.querySelector('.remove').append(groupmenu);
    }

}


/* 设置模态框位置函数 */
let resetposition = (obj, e, X, Y) => {
    obj.style.display = "block";
    obj.style.left = e.clientX + X + "px";
    obj.style.top = e.clientY + Y + "px";
}
/* 生成确认框框函数 */
let createConfirm = (clicktarget) => {
    let quesbar = `<div class="quesbar">
    <img src="" alt="">
        <h4>将永久删除“${clicktarget.querySelector('.title').innerText}”。</h4>
        <h5>您将无法撤销此操作</h5>

        <div class="btns">
            <button class="cansel" data-confirm="cansel">取消</button>
            <button class="yes" data-confirm="yes">删除</button>
        </div>
    </div>`
    document.body.insertAdjacentHTML('afterbegin', quesbar);
}
let delTaskItem = (clicktarget) => {
    mask.style.display = "block";
    createConfirm(clicktarget);
    let index = Array.from(areas).indexOf(clicktarget.parentNode);
    let quesb = document.querySelector('.quesbar');
    let reques = (e) => {
        if (e.target.dataset.confirm == "cansel") quesb.style.display = "none";
        if (!e.target.hasAttribute('data-confirm')) return;
        else if (e.target.dataset.confirm == "yes") {
            delSigleItem(clicktarget);
            Array.from(lists)[index].click();
        };
        quesb.style.display = "none";
        mask.style.display = "none";
    }

    let keyreques = (e) => {
        if (e.code == "KeyQ") {
            mask.style.display = "none";
            quesb.style.display = "none"
        }
        else if (e.code == "Enter") {
            delSigleItem(clicktarget);
            mask.style.display = "none";
            quesb.style.display = "none"
            Array.from(lists)[index].click();
        }
        document.body.removeEventListener('keyup', keyreques);
    }
    quesb.addEventListener("click", reques);
    document.body.addEventListener("keyup", keyreques)

}
/* 删除列表函数 */
let dellist = (clicktarget) => {
    /* 背景蒙版 */
    mask.style.display = "block";
    createConfirm(clicktarget);
    let index = Array.from(lists).indexOf(clicktarget);
    let quesb = document.querySelector('.quesbar');
    let dex = clicktarget.getAttribute('dex')
    /* 模态框确认函数 */
    let reques = (e) => {
        let index = Array.from(lists).indexOf(clicktarget);
        if (e.target.dataset.confirm === "cansel") quesb.style.display = "none";
        else if (!e.target.hasAttribute('data-confirm')) return;
        else if (e.target.dataset.confirm === "yes") {
            /* 删除list数据 */

            changelistdata("删除数据", Number(dex), clicktarget.innerText);
            chageItemData(useremail, index, 'content', 'datastr', 0, '删除当前列表所有task', 'state');
            Array.from(lists)[index].remove()
            Array.from(areas)[index].remove()
            Array.from(inputs)[index].remove()
            Array.from(addtaskitembtns)[index].remove()

            if (Array.from(lists).length) {
                Array.from(lists)[lists.length - 1].click();
            }
        }
        quesb.style.display = "none";
        mask.style.display = "none";

    }

    /* 键盘确认函数 */
    let keyreques = (e) => {
        if (e.code == "KeyQ") {
            mask.style.display = "none";
            quesb.style.display = "none"
        }
        else if (e.code == "Enter") {

            Array.from(lists)[index].remove()
            Array.from(areas)[index].remove()
            Array.from(inputs)[index].remove()
            Array.from(addtaskitembtns)[index].remove()
            changelistdata("删除数据", Number(dex), clicktarget.innerText)
            chageItemData(useremail, index, 'content', 'datastr', 0, '删除当前列表所有task', 'state');

            if (Array.from(lists).length) {
                Array.from(lists)[lists.length - 1].click();
            }
            quesb.style.display = "none";
            mask.style.display = "none";
        }
        document.body.removeEventListener('keydown', keyreques)
    }
    quesb.addEventListener('click', reques)
    document.body.addEventListener('keydown', keyreques)
}

/* 添加list状态函数 */
let addstate = (e) => {
    let task = e.target.parentNode;
    let nowarea = e.target.parentNode.parentNode;
    let index = Array.from(areas).indexOf(nowarea);

    let hasdone = nowarea.querySelector('.hasdonearea');
    /* 修改按钮样式 */
    e.target.firstElementChild.classList.toggle('fontchange')
    e.target.classList.toggle('change');
    e.target.nextElementSibling.classList.toggle('linethrough');

    let dex = task.getAttribute('lastdex');
    /* 注意getAttribute返回字符串 */
    console.log(dex);

    /* 添加完成状态 */
    if (!task.hasAttribute('done')) {
        task.setAttribute('done', '');
    }
    else {
        task.removeAttribute('done')
    };
    chageItemData(useremail, index, "null", "null", Number(dex), "修改item状态", "state");
    if (task.hasAttribute('done')) {
        hasdone.style.opacity = 1;
        hasdone.after(task);
    }
    else {
        nowarea.prepend(task);
        if (hasdone.nextElementSibling == undefined) {
            hasdone.style.opacity = 0;
        }
    }
    /* 触发任务条更新函数 */
    /* 判断改区域是否属于areas */
    if (index != -1) Array.from(lists)[index].click();

}
/* createtask函数 */
let createtask = (index, datastr, content) => {
    let taskitem = `<div class="taskitem" data-date="${datastr}" ><button class="done"><i class="iconfont icon-wancheng2"></i></button><p class="title">${content}</p></div>`
    Array.from(areas)[index].insertAdjacentHTML('afterbegin', taskitem);
    // afterbegin在元素内部第一个子节点之前 下标0 排第一位
    // beforeend在元素内部结尾字节点之后
    Array.from(alltasks).forEach(task => task.addEventListener('contextmenu', showItemMenu));
    Array.from(alltasks).forEach(task => task.addEventListener('click', hideside))
    Array.from(alltasks).forEach(task => task.addEventListener('click', updatesbarea))
    /* 生成备忘录 */
    createpad();
    /* 触发当前列表的任务条更新函数 */
    Array.from(lists)[index].click()
    /* 动态获取所有状态按钮 */
    getalldone()
}
/* 添加任务条函数 */
let addtask = (e) => {
    let index = Array.from(addtaskitembtns).indexOf(e.target)
    let content = Array.from(inputs)[index].value
    if (content == "") return;
    let now = new Date();
    let min = (now.getMinutes() < 10) ? '0' + now.getMinutes() : now.getMinutes();
    let datastr = `${now.getMonth() + 1}月${now.getDate()}日${now.getHours()}:${min}`;
    createtask(index, datastr, content);
    /*  */
    let innerArr = Array.from(areas)[index].getElementsByClassName('taskitem');

    Array.from(innerArr)[0].setAttribute('lastdex', innerArr.length - 1)

    /* 添加task数据 */

    chageItemData(useremail, index, content, datastr, innerArr.length - 1, "添加item", "state");
}

let showAll = (index) => {
    Array.from(areas)[index].classList.remove('hide')
    Array.from(addtaskitembtns)[index].classList.remove('hide');
    Array.from(inputs)[index].classList.remove('hide')

}
/* 添加list title函数 */
let addtitle = (e) => {
    if (!e.target.hasAttribute('data-listid')) return;

    let listtitle = e.target.querySelector('.title');
    let index = Array.from(lists).indexOf(e.target);
    hideall();
    showAll(index);
    infoleft.innerText = listtitle.innerText;

}
/* 创建list函数 */
let createlist = () => {
    let listitem = `<div class="listitem" data-listid =""><i class="iconfont icon-liebiao"></i><h4 class="title">默认列表</h4><div class="counter"></div></div>`
    let area = `<div class="taskarea">
    <div class="hasdonearea">
    <div class="hasdonetitle">
<div class="donetitle">已完成</div>
</div>
    </div>
    </div>`
    let addarea = `<button class="addtaskitem"><i class="iconfont icon-tianjia"></i></button><input type="text" class="taskinput" placeholder="添加任务..." required>`
    diyarea.insertAdjacentHTML('beforeend', listitem);
    addtaskarea.insertAdjacentHTML('beforeend', addarea);
    /* 注意area的插入顺序 */
    let addaaa = document.querySelector(".addtaskarea")
    addaaa.insertAdjacentHTML('beforebegin', area);

    listaddevents()
}
/*添加list函数 */
let addlistfun = () => {
    createlist();
    if (lists.length == 1) {
        Array.from(lists)[0].setAttribute('dex', 0)
    }
    else {
        let last = Array.from(lists)[lists.length - 1];
        console.log(last);
        let arr = []
        for (let item of Array.from(lists)) {
            let dex = item.getAttribute('dex');
            arr.push(Number(dex))
        }
        console.log(arr)
        let max = -1;
        for (let item of arr) {
            (item < max) ? max = max : max = item
        }
        last.setAttribute('dex', max + 1);
    }
}
let getTop = (arr) => {
    let max = -1;
    for (let item of arr) {
        if (item < arr) {
            max = max;
        }
        else max = item;
    }
    return max
}
/* 设置下标函数 */
let setIndex = (obj) => {
    if (obj.length == 1) {
        Array.from(obj)[0].setAttribute('dex', 0)
    }
    else {
        let last = Array.from(obj)[obj.length - 1];
        let before = Array.from(obj)[obj.length - 2];
        last.setAttribute('dex', Number(before.getAttribute('dex')) + 1)
    }
}
addlist.addEventListener('click', addlistfun);
/* 添加list数据 */
addlist.addEventListener('click', () => {
    console.log(Array.from(lists));

    let dex = Array.from(lists)[lists.length - 1].getAttribute('dex');

    changelistdata("添加数据", Number(dex), "默认标题", "-1")

});


let createGroup = (index, title) => {
    let groupitem = `<div class="groupitem" dex = ${index}>
    <div class="row1" data-id =''>
    <i class="iconfont icon-fenzu"></i><p class="title">${title}</p><div class="iconbox"><i class="iconfont icon-zhankai"></i></div>
    </div>
    <div class="grouplistarea"> 
    
    </div>
    </div>`
    diyarea.insertAdjacentHTML('beforeend', groupitem);

}
/* 添加分组条函数 */
let addgroupfun = () => {
    createGroup('', '分组名');
    groupaddevents();
    removeallstate()

    /* 给group设置固定下标 */
    setIndex(groupitems);

    /* 实现新建分组立即重命名函数 */
    rename(Array.from(groupitems)[groupitems.length - 1])
    /* 实现新建分组后清除右侧myday区域 */
    hideall();

}
addgroup.addEventListener('click', addgroupfun);

