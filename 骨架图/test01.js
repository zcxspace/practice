let cardimg = document.querySelector('.card_img');
let cardinfo1 = document.querySelector('.info1');
let cardinfo2 = document.querySelector('.info2');
let anibgs = document.querySelectorAll('.anibg');
let texts = document.querySelectorAll('.text')
setTimeout(getData, 2500);
function getData() {
    cardimg.innerHTML = ` <img src="https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2OHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60" alt="">`
    cardinfo1.innerHTML = '设计师'
    cardinfo2.innerHTML = '图片';
    anibgs.forEach(anibg => {
        anibg.classList.remove('anibg');
    })
    texts.forEach(text => {
        text.classList.remove('text');
    })
}
