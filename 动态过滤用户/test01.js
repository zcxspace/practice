let search = document.querySelector('#search');
let result = document.querySelector('.result');
let lis = [];





search.addEventListener('input', (e) => { filterUser(e.target.value) })


async function getInfo() {
    let res = await Promise.all(getData('users', 10));
    let users = await Promise.all(res.map(re => re.json()));
    let res2 = await Promise.all(getData('photos', 10));
    let users2 = await Promise.all(res2.map(re => re.json()));
    let photourls = [];
    users2.forEach(user => {
        photourls.push(user.url);
    })
    result.innerHTML = '';
    for (let i = 0; i < users.length - 1; i++) {
        let li = document.createElement('li');
        li.innerHTML = ` <div class="userinfo">
                        <img src="${photourls[i]}" alt="userinfo">
                         <div class="info">
                        <p>${users[i].name}</p>
                        <p>${users[i].username}</p>
                         </div>
                    </div>`
        result.append(li);
        lis.push(li);
    }
}
getInfo();


function getData(kind, num) {
    let res = [];
    for (let i = 1; i <= num; i++) {
        let re = fetch(`https://jsonplaceholder.typicode.com/${kind}/${i}`)
        res.push(re);
    }
    return res;
}


function filterUser(searchcontent) {
    lis.forEach(li => {
        if (li.innerText.toLowerCase().includes(searchcontent.toLowerCase())) {
            li.classList.remove('hide');
        }
        else {
            li.classList.add('hide');
        }
    })
}


