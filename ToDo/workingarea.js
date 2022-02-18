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

/* 我的一天模块 */
let job = document.querySelector('.job');
let mydaybar = document.querySelector('.mydaybar')
let data = document.querySelector('.data');
let todaybtn = document.querySelector('.todaybtn');
let todayinput = document.querySelector('.today');
let jobarea = document.querySelector('.job-content');
let todayjobs = jobarea.getElementsByClassName('done');
let mydayadd = () => {
    let taskcontent = todayinput.value;
    let now = new Date();
    let min = (now.getMinutes() < 10) ? 0 + now.getMinutes() : now.getMinutes();
    let todaytask = `<div class="taskitem" data-date="${now.getMonth() + 1}月${now.getDate()}日${now.getHours()}:${min}">
    <button class="done">
    <i class="iconfont icon-wancheng2"></i>
    </button>
    <p class="taskcontent">${taskcontent}</p>
    </div>`
    jobarea.insertAdjacentHTML('afterbegin', todaytask);

    Array.from(alltasks).forEach(task => task.addEventListener('click', hideside))


    /* 创建备忘录 */
    createpad();
    Array.from(alltasks).forEach(task => task.addEventListener('click', updatesbarea))
    getalldone();
    todayinput.value = "";
}
todaybtn.addEventListener('click', mydayadd)
Array.from(todayjobs).forEach(job => { job.addEventListener("click", addstate) })
todayinput.addEventListener('keyup', (e) => {
    if (e.code == "Enter") {
        todaybtn.click();
    }
})
/* 阻止鼠标右键默认事件 */
document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
})
/* 获取日期函数 */
let getDate = () => {
    let now = new Date()
    let m = now.getMonth()
    let d = now.getDate()
    data.innerHTML = `${m + 1}月${d}日`;
}

mydaybar.addEventListener('click', () => {
    job.style.display = "block";
    mydaybar.classList.add('activemaday')
    removeallstate()
    getDate();
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


/* 遍历隐藏元素函数 */
let add = (objs) => {
    objs.forEach(obj => {
        obj.classList.add('hide')
    })
}
/* 隐藏所有list清除info函数 */
let hideall = () => {
    add(Array.from(areas));
    add(Array.from(addtaskitembtns));
    add(Array.from(inputs))
    infoleft.innerText = ''
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
    Array.from(lists).forEach(list => {
        list.addEventListener('click', () => {
            job.style.display = "none"
            mydaybar.classList.remove('activemaday')
        })
    })
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
    input.onblur = function () {
        beforetitle.innerText = this.value;
        this.replaceWith(beforetitle);
        clicktarget.click();
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
    document.body.addEventListener("click", () => { randomdel(grouplidemenus) });
    /* 重命名函数 */
    let grename = document.querySelector('.grename');
    grename.addEventListener('click', () => { rename(clicktarget) })
    /* 取消分组函数 */
    let canselg = document.querySelector('.canselg');
    canselg.addEventListener('click', () => { removeoutfun(clicktarget) });

    e.preventDefault();
}

/* 取消分组函数 */
let removeoutfun = (clicktarget) => {
    /* 获取list容器的list数量 */
    let listnum = clicktarget.nextElementSibling.childElementCount;
    if (listnum) {
        let innerlists = clicktarget.nextElementSibling.getElementsByClassName('listitem');
        Array.from(innerlists).forEach(list => { diyarea.prepend(list) });
        clicktarget.parentNode.remove();
    }
    else {
        clicktarget.parentNode.remove();
    }
}

/* list移动进分组函数 */
let removeinfun = (e) => {
    let movetoindex = Array.from(movetoitems).indexOf(e.target);
    Array.from(groupitems)[movetoindex].querySelector('.grouplistarea').prepend(target);
    removeallstate()
}

/* list右键显示菜单函数 */
let showlistmenu = (e) => {
    document.body.click();
    target = e.target;
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
    let index = Array.from(lists).indexOf(clicktarget);
    let quesb = document.querySelector('.quesbar');
    /* 模态框确认函数 */
    let reques = (e) => {
        let index = Array.from(lists).indexOf(clicktarget);
        let quesb = document.querySelector('.quesbar');
        if (e.target.dataset.confirm === "cansel") quesb.style.display = "none";
        else if (!e.target.hasAttribute('data-confirm')) return;
        else if (e.target.dataset.confirm === "yes") {
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
    e.target.firstElementChild.classList.toggle('fontchange')

    e.target.classList.toggle('change');
    console.log(e.target.firstElementChild)
    e.target.nextElementSibling.classList.toggle('linethrough');

    /* 添加完成状态 */
    if (!task.hasAttribute('done')) {
        task.setAttribute('done', '');
    }
    else task.removeAttribute('done');

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
/* 添加任务条函数 */
let addtask = (e) => {
    let index = Array.from(addtaskitembtns).indexOf(e.target)
    let value = Array.from(inputs)[index].value
    let now = new Date();
    let min = (now.getMinutes() < 10) ? (0 + now.getMinutes()) : now.getMinutes();
    let taskitem = `<div class="taskitem" data-date="${now.getMonth() + 1}月${now.getDate()}日${now.getHours()}:${min}"><button class="done"><i class="iconfont icon-wancheng2"></i></button><p class="taskcontent">${value}</p></div>`
    if (value == "") return;
    Array.from(areas)[index].insertAdjacentHTML('afterbegin', taskitem);
    Array.from(alltasks).forEach(task => task.addEventListener('click', hideside))
    Array.from(alltasks).forEach(task => task.addEventListener('click', updatesbarea))
    /* 生成备忘录 */
    createpad();
    /* 触发当前列表的任务条更新函数 */
    Array.from(lists)[index].click()
    /* 动态获取所有状态按钮 */
    getalldone()
}

/* 添加list title函数 */
let addtitle = (e) => {
    if (!e.target.hasAttribute('data-listid')) return;

    let listtitle = e.target.querySelector('.title');
    let index = Array.from(lists).indexOf(e.target);

    hideall();
    Array.from(areas)[index].classList.remove('hide')
    Array.from(addtaskitembtns)[index].classList.remove('hide');
    Array.from(inputs)[index].classList.remove('hide')

    infoleft.innerText = listtitle.innerText;

}


/*添加list函数 */
let addlistfun = () => {
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
addlist.addEventListener('click', addlistfun);

/* 添加分组条函数 */
let addgroupfun = () => {
    let groupitem = `<div class="groupitem">
    <div class="row1" data-id =''>
    <i class="iconfont icon-fenzu"></i><p class="title">分组名</p><div class="iconbox"><i class="iconfont icon-zhankai"></i></div>
    </div>
    <div class="grouplistarea"> 

    </div>
    </div>`
    diyarea.insertAdjacentHTML('beforeend', groupitem);

    groupaddevents();

    removeallstate()

    /* 实现新建分组立即重命名函数 */
    rename(Array.from(groupitems)[groupitems.length - 1])
    /* 实现新建分组后清除右侧myday区域 */
    hideall();

}
addgroup.addEventListener('click', addgroupfun);

