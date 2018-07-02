let express = require('express');
let app = express();
app.listen(9999);
let fs = require('fs');
let path = require('path');
let session = require('express-session');
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('resource'));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'yangbo'
}));
// 中间件 允许跨域
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:7766");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By", ' 3.2.1');
    if (req.method == "OPTIONS") res.send();/*让options请求快速返回*/
    else next();
});
let id = '';
// 中间件 处理传进来的分类 id
app.use((req, res, next) => {
    let tempId = req.query.id || req.body.id;
    switch (tempId) {
        case 'G0001':
            id = 'recommend';
            break;
        case 'G0002':
            id = 'family';
            break;
        case 'G0003':
            id = 'jiadian';
            break;
        case 'G0004':
            id = 'phone';
            break;
        case 'G0005':
            id = 'video';
            break;
        case 'G0006':
            id = 'riza';
            break;
        case 'G0007':
            id = 'clothes';
            break;
        case 'G0008':
            id = 'healthy';
            break;
        case 'G0009':
            id = 'tableware';
            break;
        case 'G0010':
            id = 'intelligence';
            break;
        case 'G0011':
            id = 'xihu';
            break;
        case 'G0012':
            id = 'xiangbao';
            break;
        case 'G0013':
            id = 'baby';
            break;
        case 'G0014':
            id = 'diet';
            break;
        case 'G0015':
            id = 'parts';
            break;
        case 'G0016':
            id = 'travel';
            break;
        case 'G0017':
            id = 'brand';
            break;
        case 'G0018':
            id = 'crowdfunding';
            break;
        case 'G0019':
            id = 'hotItems';
            break;
        case 'G0020':
            id = 'newItems';
            break;
        case 'G0021':
            id = 'limit';
            break;
        case 'G9999':
            id = 'allData';
            break;
    }
    next();
});

/*-------------------------------*/

// 首页接口 首屏数据
app.post('/init', (req, res) => {
    let sliders = require('./mock/sliders.json'); //  轮播图数据
    let activity = require('./mock/activity.json'); // 活动导航
    let recommend = require('./mock/recommend.json'); //　有品推荐数据
    let crowdfunding = require('./mock/crowdfunding.json'); // 小米众筹数据
    res.json({sliders, activity, recommend, crowdfunding});
});

//　首页 滚动加载 传一个id给我，然后返回对应的数据
app.post('/main', (req, res) => {
    let data = require(`./mock/${id}.json`);
    if (id === 'allData') {
        data = data.slice(0, 10);
    } else {
        data = data.slice(0, 5);
    }
    res.json(data);
});

/*-------------------------------*/

//　分类数据接口
app.post('/goodscategory', (req, res) => {
    let result = {};
    result.listLink = require('./mock/listLink.json');
    result.banner = require('./mock/typeBanner.json');
    if (!id || id === 'allData') {
        result.data = require('./mock/lev_recommend.json');
    }
    else if (id === 'phone') {
        result.data = require(`./mock/${id}.json`).slice(1);
    }
    else if (id === 'brand') {
        result.data = require(`./mock/${id}.json`);
    }
    else {
        result.data = require(`./mock/lev_${id}.json`);
    }
    res.json(result);
});

// 获取指定类型分类
app.get('/goodscategory', (req, res) => {
    let result = {};
    if (!id) {
        result.data = require('./mock/lev_recommend.json');
    }
    else if (id === 'phone') {
        result.data = require(`./mock/${id}.json`).slice(1);
    }
    else if (id === 'brand') {
        result.data = require(`./mock/${id}.json`);
    }
    else {
        result.data = require(`./mock/lev_${id}.json`).slice(1);
    }
    res.json(result);
});

// 点击商品二级分类
app.post('/commodity/:gid', (req, res) => {
    let {gid} = req.params;
    // 暂时不做
});

/*-------------------------------*/

// 品味数据接口 post请求 需要参数offset,limit
app.post('/savour', (req, res) => {
    let {offset, limit} = req.body;
    let savour = require('./mock/savour.json') || [];
    let hasMore = offset < savour.length;
    savour = savour.slice(offset, limit + offset);
    res.json({hasMore, savour}) // 返回是否还有数据，返回数据
});

/*-------------------------------*/

let crypto = require('crypto'); // 加密处理插件
let userList = []; // 所有用户数据
let userCart = []; // 所有用户购物车
let userCollection = []; // 所有用户收藏
let userBill = []; // 所有用户订单
let userID = ''; // 用户id 暂时没有用处

fs.readFile('./mock/userInfo.json', 'utf-8', (err, data) => {
    if (err) return [];
    userList = JSON.parse(data);
});
fs.readFile('./mock/userCart.json', 'utf-8', (err, data) => {
    if (err) return [];
    userCart = JSON.parse(data);
});
fs.readFile('./mock/userCollection.json', 'utf-8', (err, data) => {
    if (err) return [];
    userCollection = JSON.parse(data);
});
fs.readFile('./mock/userBill.json', 'utf-8', (err, data) => {
    if (err) return [];
    userBill = JSON.parse(data);
});

/*-------------------------------*/

// 获取商品详情
app.post('/detail/:gid', (req, res) => {
    let {gid} = req.params;
    let backData = new Promise((resolve, reject) => {
        fs.readFile('./mock/allData.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        })
    });

    backData.then((result) => {
        let temp = result.find((item) => item.gid === gid);
        if (temp) {
            res.json(temp);
        }
        else {
            res.json({"msg": "没找到符合条件的商品！", "err": 1})
        }
    });
});

// 获取评价
app.post('/evaluate/:gid', (req, res) => {
    let {gid} = req.params;
    let backData = new Promise((resolve, reject) => {
        fs.readFile('./mock/userEvaluate.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        });
    });
    backData.then((result) => {
        let temp = result.find((item) => item.gid === gid);
        if (temp) {
            res.json(temp.eva);
        }
        else {
            res.json([])
        }
    }).catch((err) => {
        res.json({"msg": "对不起！程序挂掉了！", "err": 1})
    })
});

// 获取和修改  商品收藏状态
app.get('/collection/:gid', (req, res) => {
    if (!req.session.user) {
        res.json({user: null, msg: "请先登录", success: '', err: 1});
        return;
    }
    let {gid} = req.params;
    let {type} = req.query;
    let backData = new Promise((resolve, reject) => {
        fs.readFile('./mock/userCollection.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data))
        })
    });
    backData.then((result) => {
        let curUser = result.find(item => item.userId === req.session.user);
        let eva = curUser.coll.find(item => item === gid);
        if (type === 'undefined') { // 如果type没有传值，执行获取状态操作
            if (eva) {
                res.json({"collState": true});
            }
            else {
                res.json({"collState": false})
            }
        } else { // 如果type有值，执行修改状态操作
            if (eva) {
                curUser.coll = curUser.coll.filter(item => item !== gid);
                fs.writeFile('./mock/userCollection.json', JSON.stringify(result), (err) => {
                    if (err) return res.json({"msg": "修改失败"});
                    res.json({"collState": false});
                });
            }
            else {
                curUser.coll.push(gid);
                fs.writeFile('./mock/userCollection.json', JSON.stringify(result), (err) => {
                    if (err) return res.json({"msg": "修改失败"});
                    res.json({"collState": true})
                });
            }
        }
    })
});

// 获取购物车数量
app.get('/collLength', (req, res) => {
    let backData = new Promise((resolve, reject) => {
        fs.readFile('./mock/userCart.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        });
    });
    if (!req.session.user) {
        // 未登录状态 返回商品数量0
        res.json({collLength: 0, "err": 0});
        return;
    }
    backData.then((result) => {
        let curCart = result.find(item => item.userId === req.session.user);
        let collLength = curCart.cart.reduce((prev, next) => {
            return prev + next.number;
        }, 0);
        res.json({collLength, "err": 0});
    });
});

// 添加新商品到购物车 返回购物车商品数量
app.get("/cart", (req, res) => {
    if (!req.session.user) {
        res.json({user: null, msg: "请先登录", success: '', err: 1});
        return;
    }
    let {gid, number} = req.query;
    let addProduct = new Promise((resolve, reject) => {
        fs.readFile('./mock/allData.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });

    // 如果传入的商品id查找不到，应该返回添加失败

    addProduct.then((result) => {
        let allData = JSON.parse(result);
        let commodity = allData.find((item) => {
            return item.gid === gid;
        });
        commodity.number = parseInt(number) || 1;
        return commodity; // 返回找到的商品数据
    }).then((result) => {
        let userCart = JSON.parse(fs.readFileSync('./mock/userCart.json', 'utf-8'));
        userCart.forEach((item) => {
            let proIndex = null;
            if (item.userId === req.session.user) {
                let flag = item.cart.some((item, index) => {
                    // 查询这个商品是否已经加入过购物车，如果已经存在，找到在购物车中的位置
                    proIndex = index;
                    return item.gid === gid;
                });
                if (flag) {
                    // 如果存在就执行数量累加
                    item.cart[proIndex].number += parseInt(number);
                }
                else {
                    // 如果不存在 就添加一个新的商品
                    item.cart.push(result);
                }
            }
        });
        return userCart;
    }).then((result) => {
        fs.writeFile('./mock/userCart.json', JSON.stringify(result), 'utf-8', (err) => {
            if (err) return res.json({"msg": "添加失败！", err: 1});
            let curCart = result.find(item => item.userId === req.session.user);
            let collLength = curCart.cart.reduce((prev, next) => {
                return prev + next.number;
            }, 0);
            res.json({"msg": "添加成功！", collLength, "err": 0})
        });
    });
});

/*-------------------------------*/

// 获取用户购物车数据
app.post('/cart', (req, res) => {
    if (!req.session.user) {
        res.json({user: null, msg: "请先登录", success: '', err: 1});
        return;
    }
    fs.readFile('./mock/userCart.json', 'utf-8', (err, data) => {
        if (err) return console.log('读取失败!');
        let userCart = JSON.parse(data);
        let findCart = userCart.find((item) => item.userId === req.session.user) || [];
        let recommend = require('./mock/allData.json');
        recommend = recommend.slice(7, 15); // 推荐的数据
        res.json({"userCart": findCart.cart, recommend});
    });
});

// 修改用户购物车数据
app.put('/cart', (req, res) => {
    if (!req.session.user) {
        res.json({user: null, msg: "请先登录", success: '', err: 1});
        return;
    }
    let {gid, number} = req.query;
    fs.readFile('./mock/userCart.json', 'utf-8', (err, data) => {
        if (err) return console.log('读取失败!');
        let userCart = JSON.parse(data);
        let curCartIndex, curProIndex;
        // 找到登录用户的购物车
        let findCart = userCart.find((item, index) => {
            curCartIndex = index; // 当初是觉得可用会用到商品位置，现在暂无用处
            return item.userId === req.session.user;//userId
        });
        // 找到购物车中商品的位置
        let curProduct = findCart['cart'].find((item, index) => {
            curProIndex = index; // 当初是觉得可用会用到商品位置，现在暂无用处
            return item.gid === gid;
        });
        if (!curProduct) {
            // 如果没找到，返回默认状态
            res.json({"userCart": findCart.cart});
            return;
        }
        curProduct.number = parseInt(number);
        fs.writeFile('./mock/userCart.json', JSON.stringify(userCart), 'utf-8', (err) => {
            if (err) return console.log('写入失败!');
        });
        res.json({"userCart": findCart.cart});
    });
});

// 修改单个商品选中状态
app.get('/cart/singlestate', (req, res) => {
    if (!req.session.user) {
        res.json({user: null, msg: "请先登录", success: '', err: 1});
        return;
    }
    let {gid, state} = req.query;
    let backData = new Promise((resolve, reject) => {
        fs.readFile('./mock/userCart.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        })
    });
    backData.then((result) => {
        let userCart = result.find(item => item.userId === req.session.user);
        let eva = userCart.cart.find(item => item.gid === gid);
        eva.isSelected = JSON.parse(state);

        fs.writeFile('./mock/userCart.json', JSON.stringify(result), 'utf-8', (err) => {
            if (err) return console.log('修改失败');
            res.json({"msg": "ok", "err": 0});
        })
    })
});

// 修改分组商品选中状态
app.get('/cart/partstate', (req, res) => {
    if (!req.session.user) {
        res.json({user: null, msg: "请先登录", success: '', err: 1});
        return;
    }
    let {from, state} = req.query;
    let backData = new Promise((resolve, reject) => {
        fs.readFile('./mock/userCart.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        })
    });
    backData.then((result) => {
        let userCart = result.find(item => item.userId === req.session.user);
        for (let i = 0; i < userCart.cart.length; i++) {
            let temp = userCart.cart[i];
            from = from.replace(/['"]/g, '');
            if (temp.from === from) {
                temp.isSelected = JSON.parse(state);
            }
        }

        fs.writeFile('./mock/userCart.json', JSON.stringify(result), 'utf-8', (err) => {
            if (err) return console.log('修改失败');
            res.json({"msg": "ok", "err": 0});
        })
    })
});

// 修改所有商品选中状态
app.get('/cart/allstate', (req, res) => {
    if (!req.session.user) {
        res.json({user: null, msg: "请先登录", success: '', err: 1});
        return;
    }
    let {state} = req.query;
    let backData = new Promise((resolve, reject) => {
        fs.readFile('./mock/userCart.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        })
    });
    backData.then((result) => {
        let userCart = result.find(item => item.userId === req.session.user);
        userCart.cart.forEach((item) => {
            item.isSelected = JSON.parse(state);
        });

        fs.writeFile('./mock/userCart.json', JSON.stringify(result), 'utf-8', (err) => {
            if (err) return console.log('修改失败');
            res.json({"msg": "ok", "err": 0});
        })
    })
});

// 修改单个要移除商品状态
app.get('/cart/delsingle', (req, res) => {
    if (!req.session.user) {
        res.json({user: null, msg: "请先登录", success: '', err: 1});
        return;
    }
    let {gid, state} = req.query;
    let backData = new Promise((resolve, reject) => {
        fs.readFile('./mock/userCart.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        })
    });
    backData.then((result) => {
        let userCart = result.find(item => item.userId === req.session.user);
        let eva = userCart.cart.find(item => item.gid === gid);
        eva.delState = JSON.parse(state);

        fs.writeFile('./mock/userCart.json', JSON.stringify(result), 'utf-8', (err) => {
            if (err) return console.log('修改失败');
            res.json({"msg": "ok", "err": 0});
        })
    })
});

// 修改部分要移除商品状态
app.get('/cart/delpart', (req, res) => {
    if (!req.session.user) {
        res.json({user: null, msg: "请先登录", success: '', err: 1});
        return;
    }
    let {from, state} = req.query;
    let backData = new Promise((resolve, reject) => {
        fs.readFile('./mock/userCart.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        })
    });
    backData.then((result) => {
        let userCart = result.find(item => item.userId === req.session.user);
        for (let i = 0; i < userCart.cart.length; i++) {
            let temp = userCart.cart[i];
            from = from.replace(/['"]/g, '');
            if (temp.from === from) {
                temp.delState = JSON.parse(state);
            }
        }

        fs.writeFile('./mock/userCart.json', JSON.stringify(result), 'utf-8', (err) => {
            if (err) return console.log('修改失败');
            res.json({"msg": "ok", "err": 0});
        })
    })
});

// 修改全部要移除商品状态
app.get('/cart/delall', (req, res) => {
    if (!req.session.user) {
        res.json({user: null, msg: "请先登录", success: '', err: 1});
        return;
    }
    let {state} = req.query;
    let backData = new Promise((resolve, reject) => {
        fs.readFile('./mock/userCart.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        })
    });
    backData.then((result) => {
        let userCart = result.find(item => item.userId === req.session.user);
        userCart.cart.forEach((item) => {
            item.delState = JSON.parse(state);
        });

        fs.writeFile('./mock/userCart.json', JSON.stringify(result), 'utf-8', (err) => {
            if (err) return console.log('修改失败');
            res.json({"msg": "ok", "err": 0});
        })
    })
});

// 移除选中商品
app.post('/cart/delete', (req, res) => {
    if (!req.session.user) {
        res.json({user: null, msg: "请先登录", success: '', err: 1});
        return;
    }
    let progress = new Promise((resolve, reject) => {
        fs.readFile('./mock/userCart.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        });
    });
    progress.then((result) => {
        let user = result.find((item) => item.userId === req.session.user);
        user.cart = user.cart.filter((item) => !item.delState);

        fs.writeFile('./mock/userCart.json', JSON.stringify(result), 'utf-8', (err) => {
            if (err) return res.json({"msg": "移除失败", err: 0});
            res.json({"msg": "移除成功", err: 0});
        })
    })
});

/*-------------------------------*/
// 获取支付列表
app.post('/pay', (req, res) => {
    if (!req.session.user) {
        res.json({user: null, msg: "请先登录", success: '', err: 1});
        return;
    }
    let backData = new Promise((resolve, reject) => {
        fs.readFile('./mock/userCart.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        })
    });

    backData.then((result) => {
        let userCart = result.find(item => item.userId === req.session.user);
        let payList = userCart.cart.filter(item => item.isSelected);
        res.json(payList);
    })
});

// 验证支付密码
app.post('/payverfication', (req, res) => {
    if (!req.session.user) {
        res.json({user: null, msg: "请先登录", success: '', err: 1});
        return;
    }

    let {paypsd} = req.body;
    let backData = new Promise((resolve, reject) => {
        fs.readFile('./mock/userInfo.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        })
    });
    let userCart = new Promise((resolve, reject) => {
        fs.readFile('./mock/userCart.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        })
    });
    let userBill = new Promise((resolve, reject) => {
        fs.readFile('./mock/userBill.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        })
    });

    backData.then((result) => {
        let user = result.find(item => item.userid === req.session.user);
        if (user.paypsd === paypsd) {
            userCart.then((cart) => {
                let userCart = cart.find(item => item.userId === req.session.user);
                let payEva = userCart.cart.filter(item => item.isSelected); // 保存支付商品列表
                userCart.cart = userCart.cart.filter(item => !item.isSelected); // 过滤掉支付商品

                // 将移除后的结果写入userCart
                fs.writeFile('./mock/userCart.json', JSON.stringify(cart), 'utf-8', (err) => {
                    if (err) return console.log('移除支付商品失败');

                    userBill.then((bill) => {
                        let userBill = bill.find(item => item.userId === req.session.user);
                        let date = new Date();
                        let year = date.getFullYear();
                        let mouth = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
                        let day = date.getDay() < 10 ? '0' + date.getDay() : date.getDay();
                        let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                        let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                        // 订单格式
                        let billInfo = {
                            "pid": Math.round(Math.random() * 100000000000).toFixed(0),
                            "time": `${year}/${mouth}/${day}  ${hour}:${minute}`,
                            "state": "pendingReceived",
                            "commodity": payEva
                        };

                        userBill.bill = [...userBill.bill, billInfo]; // 合并订单列表内的商品

                        fs.writeFile('./mock/userBill.json', JSON.stringify(bill), 'utf-8', (err) => {
                            if (err) return console.log('添加新订单失败');
                            res.json({
                                "msg": "支付成功",
                                "err": 0,
                                "successCode": 0
                            })
                        })
                    })
                })
            });
        } else {
            res.json({
                "msg": "支付失败",
                "err": 1,
                "successCode": 1
            })
        }
    })
});

/*-------------------------------*/

// 获取热门搜索和历史搜索
app.get('/search', (req, res) => {
    let backData = new Promise((resolve, reject) => {
        fs.readFile('./mock/search.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        })
    });
    backData.then((result) => {
        res.json(result);
    })
});

// 搜索接口
app.post('/search', (req, res) => {
    let {info} = req.body;
    if (!info) return res.json([]);
    let dataSource = new Promise((resolve, reject) => {
        fs.readFile('./mock/allData.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        })
    });
    dataSource.then((result) => {
        let searchResult = [];
        result.forEach((item) => {
            if (searchResult.length > 10) return;
            if (item.title.includes(info) || item.describe.includes(info)) {
                let temp = {
                    "gid": item.gid,
                    "title": item.title
                };
                searchResult.push(temp);
            }
        });
        res.json(searchResult)
    });
});

// 添加历史记录
app.put('/search', (req, res) => {
    let {gid} = req.query;
    let backData = new Promise((resolve, reject) => {
        fs.readFile('./mock/search.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data))
        })
    });
    let addData = new Promise((resolve, reject) => {
        fs.readFile('./mock/allData.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data))
        })
    });
    addData.then((result) => {
        let eva = result.find(item => item.gid === gid);
        let backEva = {
            "gid": eva.gid,
            "title": eva.title
        };
        backData.then((result) => {
            result.history.push(backEva);
            fs.writeFile('./mock/search.json', JSON.stringify(result), 'utf-8', (err) => {
                if (err) return console.log("添加历史记录失败");
                res.json({"msg": "添加历史记录", "err": 0});
            })
        })
    })
});

// 清空历史搜索
app.delete('/search', (req, res) => {
    let backData = new Promise((resolve, reject) => {
        fs.readFile('./mock/search.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data))
        })
    });
    backData.then((result) => {
        result.history = [];
        fs.writeFile('./mock/search.json', JSON.stringify(result), 'utf-8', (err) => {
            if (err) {
                res.json({"msg": "清空失败!", err: 1});
                return;
            }
            res.json({"msg": "清空成功!", err: 0})
        })
    })
});

/*-------------------------------*/
let tempCode = '!@#$%^&*()_+';

// 注册接口 + 手机+验证码 登录
app.post('/register', (req, res) => {
    let {username, password} = req.body;
    let user = userList.find((item) => {
        return item.mobile === username;
    });
    if (user) {
        let findUser = userList.find((item) => {
            return (item.mobile === username) && (tempCode === password)
        });
        if (findUser) {
            req.session.user = user.userid;
            res.json({user: user.userid, msg: '', success: 'ok', err: 0});
            tempCode = '!@#$%^&*()_+';
        } else {
            res.json({user: null, msg: '验证码不正确', success: 'no', err: 1});
        }
    } else {
        password = crypto.createHash('md5').update('!@#$%^&*()_+').digest('base64');
        let temp = parseInt(userList[userList.length - 1].userid.slice(1));
        userList.forEach((item) => {
            let tempItem = parseInt(item.userid.slice(1));
            if (tempItem > temp) {
                temp = tempItem;
            }
        });
        let userInfoItem = {
            "userid": `U${temp + 1}`,
            "userimg": "",
            "username": 'E' + (Math.random() * 10000000).toFixed(0),
            "password": password,
            "email": "",
            "paypsd": "888888",
            "mobile": username,
            "bill": {
                "all": [],
                "pendingPayment": [],
                "pendingReceived": [],
                "pendingEvaluate": [],
                "refund": [],
                "received": []
            },
            "cart": [],
            "assets": {},
            "collection": {},
            "address": {},
            "news": {},
            "help": {}
        };
        let userCartItem = {
            "userId": `U${temp + 1}`,
            "cart": []
        };
        let userCollectionItem = {
            "userId": `U${temp + 1}`,
            "coll": []
        };
        let userBillItem = {
            "userId": `U${temp + 1}`,
            "bill": []
        };

        userList.push(userInfoItem);
        userCart.push(userCartItem);
        userCollection.push(userCollectionItem);
        userBill.push(userBillItem);
        fs.writeFile('./mock/userInfo.json', JSON.stringify(userList), 'utf-8', (err) => {
            if (err) return console.log('用户列表写入失败');

            fs.writeFile('./mock/userCart.json', JSON.stringify(userCart), (err) => {
                if (err) return console.log('用户购物车列表写入失败');

                fs.writeFile('./mock/userCollection.json', JSON.stringify(userCollection), (err) => {
                    if (err) return console.log('用户收藏列表写入失败');

                    fs.writeFile('./mock/userBill.json', JSON.stringify(userBill), (err) => {
                        if (err) return console.log('用户订单列表写入失败');
                        req.session.user = userInfoItem.userid;
                        res.json({user: req.session.user, msg: "", success: "ok", err: 0});
                    });
                });
            });
        });
    }
});

// 登录接口
app.post('/login', (req, res) => {
    let {username, password} = req.body;
    let _password = crypto.createHash('md5').update(password).digest('base64');
    let user = userList.find((item) => {
        return (item.mobile === username) && (item.password === _password);
    });
    if (user) {
        req.session.user = user.userid;
        userID = user.userid;
        res.json({user: user.userid, msg: '', success: 'ok', err: 0});
        tempCode = '!@#$%^&*()_+';
    } else {
        res.json({user: null, msg: '用户名或密码不正确', success: 'no', err: 1});
    }
});

// 验证码获取
app.get('/phonecode', (req, res) => {
    let {mobile} = req.query;
    // let user = userList.find((item) => item.mobile === mobile);
    // if (user) {
    //   res.json({"msg": "该手机号已被注册！", "err": 1});
    //   return;
    // }
    let randomCode = '';
    for (let i = 0; i < 6; i++) {
        randomCode += Math.round(Math.random() * 9);
    }
    tempCode = randomCode;
    res.json({"mobileCode": randomCode, "err": 0});
});

// 退出登录
app.delete('/signout', (req, res) => {
    req.session.user = null;
    res.json({user: req.session.user, msg: '退出成功', success: 'ok', err: 0})
});

// 获取个人信息
app.post('/userInfo', (req, res) => {
    if (!req.session.user) {
        res.json({"msg": "用户错误！", "err": 1});
        return;
    }
    fs.readFile('./mock/userInfo.json', 'utf-8', (err, data) => {
        if (err) return console.log('读取失败');
        let userList = JSON.parse(data);
        let userInfo = userList.find((item) => item.userid === req.session.user);
        let tempInfo = {};
        tempInfo.userid = userInfo.userid;
        tempInfo.userimg = userInfo.userimg;
        tempInfo.username = userInfo.username;
        tempInfo.bill = userInfo.bill;
        tempInfo.assets = userInfo.assets;
        tempInfo.collection = userInfo.collection;
        tempInfo.address = userInfo.address;
        tempInfo.news = userInfo.news;
        tempInfo.help = userInfo.help;
        res.json(tempInfo);
    });
});

// 修改用户名
app.post('/modifyusername', (req, res) => {
    if (!req.session.user) {
        res.json({"msg": "用户错误！", "err": 1});
        return;
    }
    let {username} = req.body;
    let user = userList.find(item => item.userid === req.session.user);
    user.username = username;
    fs.writeFile('./mock/userInfo.json', JSON.stringify(userList), 'utf-8', (err) => {
        if (err) {
            res.json({"msg": "修改失败", "err": 1});
            return;
        }
        res.json({"msg": "修改成功", "err": 0})
    })

});

/*-------------------------------*/

// 获取收藏列表
app.get('/collectionlist', (req, res) => {
    if (!req.session.user) {
        res.json({"msg": "用户错误！", "err": 1});
        return;
    }
    let backData = new Promise((resolve, reject) => {
        fs.readFile('./mock/userCollection.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data))
        })
    });
    let dataList = new Promise((resolve, reject) => {
        fs.readFile('./mock/allData.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data))
        })
    });

    backData.then((result) => {
        let user = result.find(item => item.userId === req.session.user);
        let collList = user.coll;
        dataList.then((dataList) => {
            let backList = [];
            for (let i = 0; i < collList.length; i++) {
                let obj = collList[i];
                dataList.forEach((item) => {
                    if (obj === item.gid) {
                        backList.push(item);
                    }
                })
            }
            res.json({"msg": "返回成功", "err": 0, backList});
        })
    })
});

// 获取订单列表
app.get('/userbill', (req, res) => {
    if (!req.session.user) {
        res.json({"msg": "用户错误！", "err": 1});
        return;
    }
    let backData = new Promise((resolve, reject) => {
        fs.readFile('./mock/userBill.json', 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data))
        })
    });

    backData.then((result) => {
        let user = result.find((item) => item.userId === req.session.user);
        let bill = user.bill;
        res.json({"msg": "订单列表", "err": 0, bill});
    })
});

/*-------------------------------*/

// 验证登录状态
app.get('/validate', (req, res) => {
    if (req.session.user) {
        res.json({user: req.session.user, msg: "已登录", success: '', err: 0})
    } else {
        res.json({user: null, msg: "未登录", success: '', err: 1})
    }
});

/*
* {
  "code": 0,
  "message": "ok",
  "result": {
    "code": 0,
    "message": "",
    "description": "",
    "data": {
    }
  }
}*/