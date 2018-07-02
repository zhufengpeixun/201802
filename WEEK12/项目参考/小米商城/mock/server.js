let fs = require('fs');
let express = require('express');
let app = express();
let session = require('express-session'); //session中间件

app.listen(9999, () => {
    console.log('server on port 9999 success!!');
});

let bodyParser = require('body-parser');
app.use(bodyParser.json()); //解析请求体的中间件,req.body上为解析后的结果
app.use(session({
    resave: true, //每次重新保存
    secret: 'mishop',
    saveUninitialized: true
})); //req.session 进行设置了内容

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});


/*
 * 读取文件内容
 * @param p 需要读取的数据文件路径
 * @param fn   回调函数,返回读取的数据
 */
let read = (p, fn) => {
    //   console.log(p);
    require('fs').readFile(p, 'utf-8', (err, data) => {
        if (err) {
            return {code: 0, err: 'file does not exist!'}
        } else {

            fn(JSON.parse(data))
        }
    })
};

/*
 * 写入文件内容
 * @param p  需要写入文件的路径
 * @param d  需要写入文件的数据
 * @param cb  回调函数
 */
let write = (p, d, cb) => {
    fs.writeFile(p, JSON.stringify(d), cb)
};

//获取首页各部分轮播图数据接口
app.get('/sliders/:type', (req, res) => {
    let {type} = req.params;
    read('./data/home/sliders.json', (data) => {
        let {commendSlider, smartSlider, tvSlider, computerSlider, lifeSlider} = data;
        switch (type) {
            case 'commend':  //推荐
                res.json(commendSlider);
                break;
            case "smart":  //智能
                res.json(smartSlider);
                break;
            case "tv":  //电视
                res.json(tvSlider);
                break;
            case "computer":  //电脑
                res.json(computerSlider);
                break;
            case "life":  //生活周边
                res.json(lifeSlider);
                break;
        }

    })
});

//获取所有商品
let getAllProducts = (cb) => {
    read('./data/allSortsItems.json', (allProducts) => {
        cb(allProducts);
    })
};
//获取产品详情接口
app.get('/detail/:id', (req, res) => {
    let {id} = req.params;
    getAllProducts((data) => {
        let item = data.find(item => item.id == id);
        res.json(item);
    })
});

//获取所有商品数据接口
app.get('/allSorts', (req, res) => {
    read('./data/allSortsItems.json', (data) => {
        res.json(data);
    })
});


//======首页部分
//获取推荐页面中 所有商品数据接口
app.get('/commend', (req, res) => {
    read('./data/home/commend.json', (data) => {
        res.json(data);
    })
});
//获取推荐页面中 商品分类前后图片接口
app.get('/commendimg', (req, res) => {
    read('./data/home/commendImg.json', (data) => {
        res.json(data);
    })
});
//获取生活周边页面中 所有商品数据接口
app.get('/life', (req, res) => {
    read('./data/home/life.json', (data) => {
        res.json(data);
    })
});
//获取生活周边页面中 商品分类前后图片接口
app.get('/lifeimg', (req, res) => {
    read('./data/home/lifeImg.json', (data) => {
        res.json(data);
    });
})
//获取智能页面中 所有商品数据接口
app.get('/smart', (req, res) => {
    read('./data/home/smart.json', (data) => {
        res.json(data);
    })
});
//获取电脑页面中 商品分类前后图片接口
app.get('/smartimg', (req, res) => {
    read('./data/home/smartImg.json', (data) => {
        res.json(data);
    })
});
//获取电视页面中 所有电视数据接口
app.get('/television', (req, res) => {
    read('./data/home/tv.json', (data) => {
        res.json(data);
    })
});
//获取电视页面中 商品分类前后图片接口
app.get('/tvimg', (req, res) => {
    read('./data/home/tvImg.json', (data) => {
        res.json(data);
    })
});
//获取电脑页面中 所有电脑数据接口
app.get('/computer', (req, res) => {
    read('./data/home/notebook.json', (data) => {
        res.json(data);
    })
});
//获取电脑页面中 商品分类前后图片接口
app.get('/comimg', (req, res) => {
    read('./data/home/notebookImg.json', (data) => {
        res.json(data);
    })
});
//获取全面屏页面中 所有手机数据接口
app.get('/phone', (req, res) => {
    read('./data/home/phone.json', (data) => {
        res.json(data);
    })
});
//获取全面屏页面中 所有手机数据接口
app.get('/phoneimg', (req, res) => {
    read('./data/home/phoneimg.json', (data) => {
        res.json(data);
    })
});
//获取分类页面左侧列表数据
app.get('/sortlist', (req, res) => {
    read('./data/sorts/sortList.json', (data) => {
        res.json(data);
    })
});
app.get('/categorylist', (req, res) => {
    read('./data/sorts/allSortProducts.json', (data) => {
        res.json(data);
    })
});

//======分类
//获取分类页面中 二级列表中的数据接口
app.get('/list/:listId', (req, res) => {
    read('./data/sorts/commodityList.json', (data) => {
        let {listId} = req.params;
        let list = data[listId];
        res.json(list);
    })
});


//将登录后存储在cookie中userName对应用户的userId拿到,退出后再清除这个userId
let userId = null;

//=>获取所有用户购物车商品
let getAllCarts = (cb) => {
    read('./data/carts.json', (allShopItems) => {
        cb(allShopItems);
    })
};

//加入购物车接口
app.post('/addcarts', (req, res) => {
    read('./data/carts.json', (data) => {
        let {item} = req.body;
        //  console.log(item);
        let myItems;
        if (!userId) {
            res.json({err: 1, msg: "请先登录再加入购物车", success: ""});
        } else {
            let myItemsObj = data.find(item => item.userId == userId);
            if (!myItemsObj) {
                let newObj = {
                    userId: userId,
                    cart: []
                }
                data.push(newObj)
                myItems = newObj.cart;
            } else {
                myItems = myItemsObj.cart
            }

            let flag = myItems.find(cur => cur.id == item.id);
            if (!flag) {
                item.count = 1
            } else {
                flag.count += 1;
            }
            myItems.push(item);
            write('./data/carts.json', data, () => {
            });
            res.json({err: 0, msg: "", success: "加入购物车成功"});
        }
    })
});

//修改购物车商品数量接口
app.put('/shopcarts', (req, res) => {
    let {id, count} = req.body;
    let myItems;
    if (!userId) {
        res.json({err: 1, msg: "请先登录再加入购物车", success: ""});
    } else {
        getAllCarts((allItems) => {
            let myItemsObj = allItems.find(item => item.userId == userId);
            if (!myItemsObj) {
                let newObj = {
                    userId: userId,
                    cart: []
                }
                allItems.push(newObj)
                myItems = newObj.cart;
            } else {
                myItems = myItemsObj.cart
            }
            let thisItem = myItems.find(item => item.id == id);
            thisItem.count = count;
            write('./data/carts.json', allItems, () => {
                res.json(myItemsObj.cart)
            })
        })
    }
});

//获取不同用户的购物车列表接口
app.post('/shopcarts', (req, res) => {
    // let {userId} = req.body;
    let myItems;
    if (!userId) {
        res.json({err: 1, msg: "请先登录再加入购物车", success: ""});
    } else {
        getAllCarts((allItems) => {
            let myItemsObj = allItems.find(item => item.userId == userId);
            if (!myItemsObj) {
                let newObj = {
                    userId: userId,
                    cart: []
                }
                allItems.push(newObj)
                myItems = newObj.cart;
            } else {
                myItems = myItemsObj.cart
            }
            res.json(myItems);
        });
    }
});

//删除购物车商品接口
app.delete('/shopcarts/:itemId', (req, res) => {
    //  let {userId} = req.params;
    let {itemId} = req.params;
    getAllCarts((allItems) => {
        let myItemsObj = allItems.find(item => item.userId == userId);
        myItemsObj.cart = myItemsObj.cart.filter(item => item.id != itemId);
        write('./data/carts.json', allItems, () => {
            res.json(myItemsObj.cart);
        });
    });
});

//=>获取所有用户信息
let getUser = (cb) => {
    read('./data/users.json', (userInfo) => {
        cb(userInfo);
    })
};

//用户注册接口
app.post('/register', (req, res) => {
    let {userName, password} = req.body;
    if (userName.length == 0 || password.length == 0) {
        res.json({err: 1, msg: "请输入用户名或密码", success: ""});
        return;
    }
    getUser((data) => {
        let user = data.find(item => item.userName == userName);
        if (user) {
            res.json({user: null, err: 1, msg: "用户已存在,请重新注册!", success: ""});
        } else {
            let newUserId = data[data.length - 1].userId + 1;
            let newUser = {
                userId: newUserId,
                userName: userName,
                password: password
            }
            data.push(newUser);
            write('./data/users.json', data, () => {
                res.json({user: null, err: 0, msg: "", success: "恭喜注册成功,现在可以登录啦！"});
            });
        }
    });
});

//用户登录接口
app.post('/login', (req, res) => {
    let {userName, password} = req.body;
    if (!userName || !password) {
        res.json({err: 1, msg: "请输入用户名和密码", success: ""});
    } else {
        getUser((data) => {
            let user = data.find(item => (item.userName == userName && item.password == password));
            if (user) {
                req.session.user = userName;
                let sessionUser = data.find(item => item.userName == req.session.user);
                userId = sessionUser.userId;
                res.json({user: userName, err: 0, msg: "", success: "恭喜登录成功"})
            } else {
                res.json({err: 1, msg: "用户名或密码错误,请重新登录", success: ""})
            }
        })
    }
});

//校验用户是否登录接口
app.get('/validate', (req, res) => {
    if (req.session.user) {
        res.json({user: req.session.user, msg: '', err: 0, success: '', userId: userId});
    } else {
        res.json({msg: '', err: 1, success: ''});
    }
});

//用户退出接口
app.get('/logout', (req, res) => {
    req.session.user = null;
    userId = null;
    res.json({err: 0, msg: "", success: "用户退出成功"});
});

//用户模糊搜索数据接口
app.post('/search', (req, res) => {
    let {titleInfo} = req.body || [];
    let infoAry;
    if (titleInfo.length == 0) {
        infoAry = []
        return;
    }
    //  console.log(1);
    getAllProducts((data) => {
        infoAry = data.filter(item => {
            return item.title.includes(titleInfo);
        })
        infoAry = infoAry.slice(0, 10)
        //   console.log(infoAry);
        res.json(infoAry);
    })
});


