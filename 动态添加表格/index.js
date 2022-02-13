


let btn1 = document.getElementById('add');
let btn2 = document.getElementById('del');
let box = document.querySelector(".info_box");
let title_btn = document.getElementById("title_btn1");
let closebox = document.querySelector(".删除");




function close() {
    box.style.display = "none";
    title_btn.value = "隐藏";
}



//添加表格信息
function add() {

    let tr = document.createElement('tr');
    let tbody = document.getElementsByTagName('tbody')[0];
    let name = document.getElementById('name').value;
    let cla = document.getElementById('cla').value;
    let sex = getRadioValue();
    tr.innerHTML = "<td>" + name + "</td>" + "<td>" + sex + "</td>" + "<td>" + cla + "</td>" + "<td>" + '<input type="checkbox" name="shan" id="shan"></td>'
    tbody.appendChild(tr);
}

/* 
getElementBy* 动态合集
querySelector* 静态合集
*/
function del() {
    let del = document.querySelectorAll("input[type='checkbox']");
    for (let i = 0; i < del.length; i++) {
        if (del[i].checked) {
            let td = del[i].parentNode;
            let tr = td.parentNode;
            // setTimeout(() => { tr.remove() }, 0)
            tr.remove();
        }
    }
}

function getRadioValue() {
    let gender = document.getElementsByName("gender");
    for (let i = 0; i < gender.length; i++) {
        if (gender[i].checked) {
            return gender[i].value;
        }
    }
}
//显示与隐藏盒子
function hide_display(obj) {
    if (obj.value == "显示") {
        box.style.display = "none";
        obj.value = "隐藏"
    }
    else if (obj.value == "隐藏") {
        box.style.display = "block";
        obj.value = "显示"
    }
}


//事件监听

title_btn.addEventListener("click", function () { hide_display(this) })
btn1.addEventListener("click", add);
btn2.addEventListener("click", del);
closebox.addEventListener("click", close);
