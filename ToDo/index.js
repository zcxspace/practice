let workingarea = document.querySelector('.workingarea');
let bar = document.querySelector('.bar');
let mydayarea = document.querySelector('.mydayarea');
let TODO = document.querySelector('.TODO');
let myday = document.querySelector('.myday');
let sb = document.querySelector('.sb');
let showsb = document.querySelector('#showsb');


showsb.onclick = () => {
    sb.classList.toggle('hide');
}
bar.onmousedown = (e) => {
    let target = e.target;
    let innerX = e.pageX - target.offsetLeft;

    document.onmousemove = (e) => {
        if (e.pageX < TODO.offsetWidth / 100 * 10) {
            bar.style.left = TODO.offsetWidth / 100 * 10 + 'px';
        }
        else if (e.pageX > TODO.offsetWidth / 100 * 70) {
            bar.style.left = TODO.offsetWidth / 100 * 70 + "px";
        }
        else {
            bar.style.left = e.pageX - innerX + 'px';
            mydayarea.style.width = TODO.offsetWidth - e.pageX - innerX + 'px';
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
    }
}
