$(function () {
    let page = 0,
        imgData = null;
    let queryData = () => {
        page++;
        $.ajax({
            url: `json/data.json?page=${page}`,
            method: 'get',
            async: false,
            dataType: 'json',
            success: result => {
                imgData = result;
            }
        });
    };
    queryData();

    //2.数据绑定
    let queryHTML = ({id, pic, link, title} = {}) => {
        if (typeof id === 'undefined') {
            return '';
        }
        return `<a href="${link}">
            <div><img src="${pic}" alt=""></div>
            <span>${title}</span>
        </a>`;
    };

    let $boxList = $('.flowBox > li'),
        boxList = [].slice.call($boxList);

    for (let i = 0; i < imgData.length; i += 3) {
        let item1 = imgData[i],
            item2 = imgData[i + 1],
            item3 = imgData[i + 2];
        boxList.sort((a, b) => {
            return a.offsetHeight - b.offsetHeight;
        }).forEach((curLi, index) => {
            curLi.innerHTML += queryHTML(eval('item' + (index + 1)));
        });
    }
});