~function () {
    let tab = document.querySelector('#tab'),
        headerList = tab.querySelectorAll('li'),
        contentList = tab.querySelectorAll('div');
    for (let i = 0; i < headerList.length; i++) {
        headerList[i].onclick = function () {
            for (let j = 0; j < headerList.length; j++) {
                contentList[j].className = "content";
                headerList[j].className = "";
            }
            headerList[i].className = "active";
            contentList[i].className = "content active";
        }
    }
}();