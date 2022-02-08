let progressbar = document.querySelector('.progress_bar');
let circles = document.querySelectorAll('.circle');
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let currentactive = 1;

prev.onclick = () => {
    currentactive--;
    if (currentactive < 1) {
        currentactive = 1;
    }
    update();
}


next.onclick = () => {
    currentactive++;
    if (currentactive > circles.length) {
        currentactive = circles.length;
    }
    update();
}
let update = () => {
    circles.forEach((circle, index) => {
        if (index < currentactive) {
            circle.classList.add('active');
        }
        else {
            circle.classList.remove('active');
        }
    })
    progressbar.style.width = (currentactive - 1) / (circles.length - 1) * 100 + '%'
    if (currentactive == 1) {
        prev.disabled = true;
    }
    else if (currentactive == circles.length) {
        next.disabled = true;
    }
    else {
        prev.disabled = false;
        next.disabled = false;

    }
}



// const actives = document.querySelectorAll('.circle .active')
