let ck = document.querySelector('#ck');
let cc = document.querySelector('#cc');
let kk = document.querySelector('#kk');
let inputs = document.querySelectorAll("input[type='checkbox']")
inputs.forEach(input => {
    input.addEventListener('change', (e) => bantoclick(e.target))
})
let bantoclick = (thechoceone) => {
    if (ck.checked && cc.checked && kk.checked) {
        if (ck === thechoceone) {
            kk.checked = false;
        }
        if (kk === thechoceone) {
            cc.checked = false;
        }
        if (cc === thechoceone) {
            ck.checked = false;
        }
    }
}