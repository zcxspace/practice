let addlist = document.querySelector('#addlist')
let diyarea = document.querySelector('.diyarea')
let lists = diyarea.getElementsByClassName('listitem');
let areas = document.getElementsByClassName('taskarea');
let infoleft = document.querySelector('.infoleft');
let i = 1;
let mydayinfo = document.querySelector('.mydayinfo');
let addtaskarea = document.querySelector('.addtaskarea');
let inputs = addtaskarea.getElementsByClassName('taskinput');
let addtaskitembtns = addtaskarea.getElementsByClassName('addtaskitem');
let menus = document.getElementsByClassName('taskmenu');

let add = (objs) => {
    objs.forEach(obj => {
        obj.classList.add('hide')
    })
}

let addevents = () => {
    let listsArr = Array.from(lists);
    let areasArr = Array.from(areas);
    let addtaskitembtnsArr = Array.from(addtaskitembtns);
    // console.log(areasArr.length)

    for (let i = 0; i < listsArr.length; i++) {
        listsArr[i].addEventListener('click', addtitle)
        listsArr[i].addEventListener('contextmenu', showrightmenu)
        addtaskitembtnsArr[i].addEventListener('click', addtask)
    }
    // let least = areasArr.length - 1;
    // console.log(least);
    listsArr[0].click();
}
/* 取消菜单函数 */
let randomdel = () => {
    let menusArr = Array.from(menus);
    menusArr.forEach(menu => menu.remove());
}
/* 随机左键取消菜单 */
document.body.addEventListener("click", randomdel);
/* 右键显示菜单函数 */
let showrightmenu = (e) => {
    randomdel();
    let menu = `<div class="taskmenu">
                    <button class="rename">重新命名</button>
        <button class="delete">删除改列表</button>
                </div>`
    document.body.insertAdjacentHTML('afterbegin', menu);
    let taskmenu = document.querySelector('.taskmenu');
    taskmenu.style.display = "block";
    taskmenu.style.left = e.clientX + 5 + "px";
    taskmenu.style.top = e.clientY + 5 + "px";
    e.preventDefault()
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
    let title = e.target.innerText
    infoleft.innerText = title;
    add(areasArr);
    add(addtaskitembtnsArr);
    add(inputsArr)
    let index = listsArr.indexOf(e.target);
    areasArr[index].classList.remove('hide')
    addtaskitembtnsArr[index].classList.remove('hide');
    inputsArr[index].classList.remove('hide')

}


let addlistfun = () => {
    let listitem = `<div class="listitem" ><i class="iconfont icon-liebiao"></i>默认列表</div>`
    let area = `<div class="taskarea"></div>`
    let addarea = `<button class="addtaskitem">添加任务条</button><input type="text" class="taskinput">`
    diyarea.insertAdjacentHTML('afterbegin', listitem);
    mydayinfo.insertAdjacentHTML('afterend', area);
    addtaskarea.insertAdjacentHTML('afterbegin', addarea);
    addevents()
}
addlist.addEventListener('click', addlistfun);

