let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let picsul = document.querySelector('.picsul');
let spot = document.querySelector('.spot');
let lis = picsul.querySelectorAll('li');
let banner = document.querySelector('.banner');
let imgwidth = lis[0].offsetWidth;
let spotlis = spot.getElementsByTagName('li');
/* 动态设置picsul宽度 */
picsul.style.width = lis.length * imgwidth + 'px';
let index = 0;

let nextfun = () => {
    index++;
    move(picsul, -index * imgwidth);
    if (index > spotlis.length - 1) {
        index = 0;
        move(picsul, index);
    }
    removeAll();
    spotlis[index].classList.add('active');
}

let prevfun = () => {
    index--;
    if (index < 0) {
        index = spotlis.length - 1;
    }
    move(picsul, -index * imgwidth);

    removeAll();
    spotlis[index].classList.add('active');
}
prev.addEventListener('click', prevfun);
next.addEventListener('click', nextfun);

/* 动画函数 */
function move(obj, target) {
    obj.style.transform = `translateX(${target}px)`
}
for (let i = 0; i < lis.length; i++) {
    let dot = document.createElement('li');
    dot.setAttribute('dex', i);
    dot.addEventListener('click', (e) => {
        let movepx = -imgwidth * dot.getAttribute('dex');
        move(picsul, movepx);
        removeAll();
        e.target.classList.add('active');
    })
    spot.append(dot)
    spotlis[0].classList.add('active');

}
function removeAll() {
    for (let li of spotlis) {
        li.classList.remove('active');
    }
}
let time1 = setInterval(() => {
    next.click()
}, 2000);

function stopinterval() {
    clearInterval(time1);
}
function resetinterval() {
    time1 = setInterval(() => {
        next.click();
    }, 2000)
}
banner.addEventListener('mouseover', stopinterval);
banner.addEventListener('mouseout', resetinterval);
