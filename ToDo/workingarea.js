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
let add = (objs) => {
    objs.forEach(obj => {
        obj.classList.add('hide')
    })
}

let addevents = () => {
    let listsArr = Array.from(lists);
    let areasArr = Array.from(areas);
    let addtaskitembtnsArr = Array.from(addtaskitembtns);

    for (let i = 0; i < listsArr.length; i++) {
        listsArr[i].addEventListener('click', addtitle)
        listsArr[i].addEventListener('contextmenu', showrightmenu)
        addtaskitembtnsArr[i].addEventListener('click', addtask)
    }
    listsArr[0].click();
}

/* 取消菜单函数 */
let randomdel = () => {
    let menusArr = Array.from(menus);
    menusArr.forEach(menu => menu.remove());
}

/* 右键显示菜单函数 */
let showrightmenu = (e) => {

    let target = e.target;
    let index = Array.from(lists).indexOf(target);
    randomdel();
    let menu = `<div class="taskmenu">
                    <button class="rename">重新命名</button>
        <button class="delete">删除改列表</button>
                </div>`
    document.body.insertAdjacentHTML('afterbegin', menu);
    let taskmenu = document.querySelector('.taskmenu');
    let del = document.querySelector('.delete');
    /* 删除 */
    del.addEventListener('click', () => { dellist(index) })
    resetposition(taskmenu, e, 5, 5);
    /* 随机左键取消菜单 */
    document.body.addEventListener("click", randomdel);

    /* 重命名 */
    let rename = taskmenu.querySelector('.rename');
    rename.addEventListener('click', () => { relistname(index) });

    e.preventDefault()

}
/* 重命名函数 */
let relistname = (index) => {
    let title = Array.from(lists)[index].querySelector('.listtitle');
    let beforetitle = title.innerText;
    let input = document.createElement('input');
    input.value = beforetitle
    title.replaceWith(input);
    input.focus();
    input.onblur = function () {
        title.innerText = this.value;
        this.replaceWith(title);
        Array.from(lists)[index].click();
    }
}
/* 设置模态框位置函数 */
let resetposition = (obj, e, X, Y) => {
    obj.style.display = "block";
    obj.style.left = e.clientX + X + "px";
    obj.style.top = e.clientY + Y + "px";
}

/* 删除列表函数 */
let dellist = (index) => {
    /* 背景蒙版 */
    mask.style.display = "block";
    let quesbar = `<div class="quesbar">
    <img src="" alt="">
        <h4>将永久删除“${Array.from(lists)[index].querySelector('.listtitle').innerText}”。</h4>
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
/* 添加任务条函数 */
let addtask = (e) => {
    let addtaskitembtnsArr = Array.from(addtaskitembtns);
    let index = addtaskitembtnsArr.indexOf(e.target)
    let inputsArr = Array.from(inputs);
    let value = inputsArr[index].value
    let areasArr = Array.from(areas);
    let taskitem = `<div class="taskitem">${value}</div>`
    areasArr[index].insertAdjacentHTML('beforeend', taskitem);
}
/* 添加list函数 */
let addtitle = (e) => {
    let listsArr = Array.from(lists);
    let addtaskitembtnsArr = Array.from(addtaskitembtns);
    let areasArr = Array.from(areas);
    let inputsArr = Array.from(inputs);
    let listtitle = e.target.querySelector('.listtitle');
    infoleft.innerText = listtitle.innerText;
    add(areasArr);
    add(addtaskitembtnsArr);
    add(inputsArr)
    let index = listsArr.indexOf(e.target);
    areasArr[index].classList.remove('hide')
    addtaskitembtnsArr[index].classList.remove('hide');
    inputsArr[index].classList.remove('hide')


}

let addlistfun = () => {
    let listitem = `<div class="listitem" ><i class="iconfont icon-liebiao"></i><h4 class="listtitle">默认列表</h4><div class="counter">1</div></div>`
    let area = `<div class="taskarea"></div>`
    let addarea = `<button class="addtaskitem">添加任务条</button><input type="text" class="taskinput">`
    diyarea.insertAdjacentHTML('afterbegin', listitem);
    mydayinfo.insertAdjacentHTML('afterend', area);
    addtaskarea.insertAdjacentHTML('afterbegin', addarea);
    addevents()
}
addlist.addEventListener('click', addlistfun);

