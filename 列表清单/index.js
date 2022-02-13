let addtab = document.querySelector('.addtab');
/* 删除按钮 */
let delbtns = document.getElementsByClassName('deltabbtn')
/* 添加任务条btn */
let additembtns = document.getElementsByClassName('additembtn');
/* 输入任务input */
let inputs = document.getElementsByClassName('inputitem');
let taskareas = document.getElementsByClassName('taskarea');
let deltaskitembtns = document.getElementsByClassName('deltaskitem');
let taskitems = document.getElementsByClassName('tasktiem');
let tabtitle = document.querySelector('.tabtitle');
// let inputitems = document.getElementsByClassName('inputitem');
/* 删除任务卡函数 */
deltab = (e) => {
    e.target.parentNode.parentNode.style.display = 'none';
}
/* 删除任务条函数 */
delitem = (e) => {
    e.target.parentNode.remove();
}
/* 添加删除线函数 */
adddelline = (e) => {
    e.target.classList.toggle('line');
}
/* Enter键输入函数 */
keyinputtab = (e) => {

    if (e.code == "Enter") {
        addtasktab();
        e.target.value = "";
    }

}

/* 添加任务条函数 */
addtaskitem = (e) => {
    /* 动态获取当前点击元素在数组中的下标 */
    let indexnow = Array.from(additembtns).indexOf(e.target);
    let values = Array.from(inputs).map(input => input.value);
    let item = `<div class="tasktiem">${values[indexnow]}<button class="deltaskitem"><i class="iconfont icon-shanchu"></i></button></div>`
    Array.from(taskareas)[indexnow].insertAdjacentHTML('beforeend', item);
    Array.from(deltaskitembtns).forEach(btn => btn.addEventListener('click', delitem))
    Array.from(taskitems).forEach(item => item.addEventListener('click', adddelline));

}
/* Eenter键添加任务条 */
keyinputitem = (e) => {
    if (e.code == "Enter") {
        Array.from(additembtns).forEach(btn => {
            btn.click();
        })
        e.target.value = "";
    }
}
/* 添加任务卡函数 */
addtasktab = () => {
    let tabtitle = document.querySelector('.tabtitle').value;
    let li = `  <div class="tasktab">
        <div class="title">${tabtitle}<button class="deltabbtn"><i class="iconfont icon-shanchu"></i></button></div>
        <div class="taskarea"></div>
        <div class="addtaskitem">
            <div class="addtaskarea">
                <input type="text" class="inputitem" placeholder="Add task..."><button class="additembtn"><i
                        class="iconfont icon-icon-"></i></button>
            </div>
        </div>
    </div>`;
    tabtitle = "";
    document.body.insertAdjacentHTML('beforeend', li);
    Array.from(delbtns).forEach(btn => btn.addEventListener('click', deltab));
    Array.from(additembtns).forEach(btn => btn.addEventListener('click', addtaskitem));
    Array.from(inputs).forEach(input => input.addEventListener('keyup', keyinputitem));
}
addtab.addEventListener('click', addtasktab);
tabtitle.addEventListener('keyup', keyinputtab);

