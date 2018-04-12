var newP = document.createElement('p');
newP.innerHTML = '我是P！！';
newP.style.backgroundColor = 'red';
document.body.appendChild(newP);

var newA = document.createElement('a');
newA.innerText = "我是A！！";
newA.style.color = 'red';
document.body.insertBefore(newA, box);

//=>把创建的A克隆一份放到BODY末尾
var cloneA = newA.cloneNode(true);
document.body.appendChild(cloneA);

//=>干掉P标签
document.body.removeChild(newP);