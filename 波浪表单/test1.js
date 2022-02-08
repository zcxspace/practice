const labels = document.querySelectorAll('.inputarea label');
labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, index) => ` <span style="transition-delay: ${index * 50}ms;">${letter}</span>`)
        .join('')
})
/* 
1.将label里面的字符串拆分成数组
2.map每一个字符 设置过渡延迟时间 时间为下标✖️基数 把每一个字符放到span中
3.再将数组连成字符串 一同插入label中
 */