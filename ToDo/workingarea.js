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
/* 遍历隐藏元素函数 */
let add = (objs) => {
    objs.forEach(obj => {
        obj.classList.add('hide')
    })
}
/* 为list绑定event函数 */
let listaddevents = () => {
    Array.from(lists).forEach(list => { list.addEventListener('click', addtitle) })
    Array.from(lists).forEach(list => { list.addEventListener('contextmenu', showrightmenu) })
    Array.from(addtaskitembtns).forEach(btn => { btn.addEventListener('click', addtask) })
    Array.from(lists)[0].click();
}
/* 为group绑定event函数 */
let groupaddevents = () => {
    Array.from(groupitems).forEach(item => item.addEventListener('contextmenu', showgroupmenu))

}
/* 取消菜单函数 */
let randomdel = (arrlike) => {
    Array.from(arrlike).forEach(menu => menu.remove());
}

/* 重命名函数 */
let rename = (clicktarget) => {
    let title = clicktarget.querySelector('.title').innerText;
    let input = document.createElement('input');
    let beforetitle = clicktarget.querySelector('.title')
    input.value = title;
    beforetitle.replaceWith(input);
    input.focus();
    input.select();
    input.onblur = function () {
        beforetitle.innerText = this.value;
        this.replaceWith(beforetitle);
        clicktarget.click();
    }
}



/* list右键显示菜单函数 */
let showrightmenu = (e) => {

    let target = e.target;
    let index = Array.from(lists).indexOf(target);
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

    /* 移动分组 */
    let remove = taskmenu.querySelector('.remove');
    creategroupsmene()
    e.preventDefault()

}
/* group右键显示菜单函数 */
let showgroupmenu = (e) => {
    let target = e.target;
    let index = Array.from(groupitems).indexOf(target);
    randomdel(grouplidemenus)
    let gmenu = `<div class="grouplidemenu">
                    <button class="grename">重新命名</button>
                    <button class="gdelete">删除改列表</button>
                </div>`
    document.body.insertAdjacentHTML('afterbegin', gmenu);
    let grouplidemenu = document.querySelector('.grouplidemenu');
    resetposition(grouplidemenu, e, 5, 5);
    document.body.addEventListener("click", () => { randomdel(grouplidemenus) });

    let grename = document.querySelector('.grename');
    grename.addEventListener('click', () => { rename(target) })
    e.preventDefault();
}
/* 显示分组菜单函数 */
let creategroupsmene = () => {
    let groupmenu = document.createElement('div');
    groupmenu.classList.add('groupmenu')
    for (let i = 0; i < groupitems.length; i++) {
        let item = `<button class="movetoitem">${i}</button>`
        groupmenu.insertAdjacentHTML('afterbegin', item);
    }
    document.querySelector('.remove').append(groupmenu);
}

/* 移动近分组函数 */
let removeinfun = (index) => {
    let list = Array.from(lists)[index]
    Array.from(groupitems)[index].append(list);
}
/* 移动出分组函数 */
let removeoutfun = (index) => {

}


/* 设置模态框位置函数 */
let resetposition = (obj, e, X, Y) => {
    obj.style.display = "block";
    obj.style.left = e.clientX + X + "px";
    obj.style.top = e.clientY + Y + "px";
}

/* 删除列表函数 */
let dellist = (clicktarget) => {
    /* 背景蒙版 */
    mask.style.display = "block";
    let quesbar = `<div class="quesbar">
    <img src="" alt="">
        <h4>将永久删除“${clicktarget.querySelector('.title').innerText}”。</h4>
        <h5>您将无法撤销此操作</h5>

        <div class="btns">
            <button class="cansel" data-confirm="cansel">取消</button>
            <button class="yes" data-confirm="yes">删除列表</button>
        </div>
    </div>`
    document.body.insertAdjacentHTML('afterbegin', quesbar);
    let quesb = document.querySelector('.quesbar');
    /* 模态框确认函数 */
    let reques = (e) => {

        let quesb = document.querySelector('.quesbar');
        if (e.target.dataset.confirm === "cansel") quesb.style.display = "none";
        else if (!e.target.hasAttribute('data-confirm')) return;
        else if (e.target.dataset.confirm === "yes") {
            Array.from(lists)[index].remove()
            Array.from(areas)[index].remove()
            Array.from(inputs)[index].remove()
            Array.from(addtaskitembtns)[index].remove()
            if (Array.from(lists).length) {
                Array.from(lists)[0].click();
            }
        }
        quesb.style.display = "none";
        mask.style.display = "none";

    }
    /* 键盘确认函数 */
    let keyreques = (e) => {
        let quesb = document.querySelector('.quesbar');
        if (e.code == "KeyQ") {
            mask.style.display = "none";
            quesb.style.display = "none"
        }
        else if (e.code == "Enter") {
            Array.from(lists)[index].remove()
            Array.from(areas)[index].remove()
            Array.from(inputs)[index].remove()
            Array.from(addtaskitembtns)[index].remove()
            if (Array.from(lists).length) {
                Array.from(lists)[0].click();
            }
            quesb.style.display = "none";
            mask.style.display = "none";

            document.body.removeEventListener('keydown', keyreques)
        }
    }
    quesb.addEventListener('click', reques)
    document.body.addEventListener('keydown', keyreques)
}

/* 添加list状态函数 */
let addstate = (e) => {
    e.target.classList.toggle('change');
    e.target.nextElementSibling.classList.toggle('linethrough');
    let task = e.target.parentNode;
    if (!task.hasAttribute('done')) {
        task.setAttribute('done', 'yes');
    }
    else task.removeAttribute('done');
}
/* 添加任务条函数 */
let addtask = (e) => {
    let addtaskitembtnsArr = Array.from(addtaskitembtns);
    let index = addtaskitembtnsArr.indexOf(e.target)
    let inputsArr = Array.from(inputs);
    let value = inputsArr[index].value
    let areasArr = Array.from(areas);
    let taskitem = `<div class="taskitem"><button class="done"><i class="iconfont icon-wancheng2"></i></button><p class="taskcontent">${value}</p></div>`
    areasArr[index].insertAdjacentHTML('beforeend', taskitem);
    /* 动态获取所有状态按钮 */
    let dones = document.getElementsByClassName('done')
    Array.from(dones).forEach(done => {
        done.addEventListener('click', addstate);
    })

}



/* 添加list title函数 */
let addtitle = (e) => {
    let listsArr = Array.from(lists);
    let addtaskitembtnsArr = Array.from(addtaskitembtns);
    let areasArr = Array.from(areas);
    let inputsArr = Array.from(inputs);
    let listtitle = e.target.querySelector('.title');
    infoleft.innerText = listtitle.innerText;
    add(areasArr);
    add(addtaskitembtnsArr);
    add(inputsArr)
    let index = listsArr.indexOf(e.target);
    areasArr[index].classList.remove('hide')
    addtaskitembtnsArr[index].classList.remove('hide');
    inputsArr[index].classList.remove('hide')
}
/*添加list函数 */
let addlistfun = () => {
    let listitem = `<div class="listitem" ><i class="iconfont icon-liebiao"></i><h4 class="title">默认列表</h4><div class="counter">1</div></div>`
    let area = `<div class="taskarea"></div>`
    let addarea = `<button class="addtaskitem">添加任务条</button><input type="text" class="taskinput">`
    diyarea.insertAdjacentHTML('afterbegin', listitem);
    mydayinfo.insertAdjacentHTML('afterend', area);
    addtaskarea.insertAdjacentHTML('afterbegin', addarea);
    listaddevents()
}
addlist.addEventListener('click', addlistfun);

/* 添加分组条函数 */
let addgroupfun = () => {
    let groupitem = `<div class="groupitem"><i class="iconfont icon-fenzu"></i><p class="title">分组名</p><i class="iconfont icon-zhankai"></i></div>`
    diyarea.insertAdjacentHTML('afterbegin', groupitem);
    groupaddevents();
}
addgroup.addEventListener('click', addgroupfun);