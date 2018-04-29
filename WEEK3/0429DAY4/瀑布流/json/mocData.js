let fs = require('fs'),
    ary = [];
for (let i =1; i <= 20; i++) {
    ary.push({
        id: i,
        pic: `img/${Math.round(Math.random() * 12 + 1)}.jpg`,
        title: '泰勒·斯威夫特（Taylor Swift），1989年12月13日出生于美国宾州，美国歌手、演员。2006年出道，同年发行专辑《泰勒·斯威夫特》，该专辑获得美国唱片业协会的白金唱片认证',
        link: 'https://baike.sogou.com/v1850208.htm?fromTitle=%E9%9C%89%E9%9C%89'
    });
}
fs.writeFileSync('data.json', JSON.stringify(ary), 'utf-8');