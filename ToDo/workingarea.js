let addlist = document.querySelector('#addlist')
let diyarea = document.querySelector('.diyarea')


/* 添加list函数 */
let addlistfun = () => {
    let i = 0;
    let lists = diyarea.getElementsByClassName('listitem');
    let listsArr = Array.from(lists);
    if (listsArr.length == 0) {
        let listitem = `<div class="listitem"><i class="iconfont icon-liebiao"></i>默认列表</div>`
        diyarea.insertAdjacentHTML('beforeend', listitem);
    }
    else {
        i++;
        let listitem = `<div class="listitem"><i class="iconfont icon-liebiao"></i>默认列表${i}</div>`
        diyarea.insertAdjacentHTML('beforeend', listitem);

    }


}
addlist.addEventListener('click', addlistfun);