let counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    counter.innerText = "0";
    let updateCounter = () => {
        let target = +counter.dataset.target;
        let c = +counter.innerText;

        let increment = target / 200;
        if (c < target) {
            counter.innerHTML = `${Math.ceil(c + increment)}`
            setTimeout(updateCounter, 1);
        }
        else {
            counter.innerHTML = target;
        }
    }
    updateCounter();
})