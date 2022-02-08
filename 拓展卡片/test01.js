let users = document.querySelectorAll('.user');
let container = document.querySelector('.container')
users.forEach(user => {
    user.addEventListener("click", () => {
        removeAll()
        user.classList.add('active')
    })
    user.addEventListener("mouseover", () => {
        clearInterval(time1);
    })
    user.addEventListener("mouseout", () => {
        timer();
    })

})
function removeAll() {
    users.forEach(user => {
        user.classList.remove('active');
    })
}
let time1 = null;

function timer() {
    let index = 0;
    time1 = setInterval((() => {
        users[index].click();
        index++;
        if (index > users.length - 1) {
            index = 0;
        }

    }), 2000)
}



