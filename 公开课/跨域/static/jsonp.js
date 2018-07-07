/*(function anonymous(window) {
    /!*
     * JSONP方法
     *   URL：请求的接口地址
     *   OPTIONS：配置项
     *      jsonp:'callback',
     *      jsonpCallback:随机生成的全局函数
     *!/
    let jsonp = function (url, options = {}) {
        //=>动态创建SCRIPT标签
        let SCRIPT = document.createElement('script');

        //=>生成一个随机的函数名（并且一定要把这个函数挂载到全局）
        let FN_NAME = `JSONP${new Date().getTime()}`;
        FN_NAME = options.jsonpCallback || FN_NAME;
        window[FN_NAME] = function (result) {
            //=>如果当前函数执行了,说明从服务器获取数据成功
            //1.移除创建的SCRIPT和创建的全局函数
            document.removeChild(SCRIPT);
            window[FN_NAME] = null;

            //2.执行RESOLVE

        };

        //=>处理传递给服务器的属性名
        let CALL_BACK = options.jsonp || 'callback';

        //=>发送JSONP请求
        SCRIPT.src = `${url}${url.indexOf('?') >= 0 ? '&' : '?'}${CALL_BACK}=${FN_NAME}&_=${new Date().getTime()}`;

        return new Promise((resolve, reject) => {
            if (typeof url === 'undefined') {
                reject('URL这一项必须传递！');
                return;
            }

        });
    };

    //=>暴露在全局下并且支持CommonJS模块规范
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        //=>支持CommonJS
        module.exports = {
            jsonp
        };
    }

    window.jsonp = jsonp;
})(typeof window === 'undefined' ? global : window);
//=>判断在不同的环境下，让WINDOW代表不同的全局对象，浏览器环境下就是WINDOW，NODE环境下执行代码就是GLOBAL
*/

;(function anonymous(window) {
    let jsonp = function (url, options = {}) {
        return new Promise((resolve, reject) => {
            //=>验证参数合法性
            if (typeof url === 'undefined') {
                reject('URL这一项必须传递！');
                return;
            }

            //=>发JSONP请求
            let SCRIPT = document.createElement('script'),
                TIMEOUT = options.timeout || 3000,
                DELAY_TIMER = null,
                CALL_BACK = options.jsonp || 'callback',
                FN_NAME = options.jsonpCallback || `JSONP${new Date().getTime()}`;
            SCRIPT.src = `${url}${url.indexOf('?') >= 0 ? '&' : '?'}${CALL_BACK}=${FN_NAME}&_=${new Date().getTime()}`;
            document.body.appendChild(SCRIPT);

            //=>发送请求后立即监听响应时间：如果超过响应时间还没有执行全局函数，则认为是失败的请求，反之认为是成功的请求
            DELAY_TIMER = setTimeout(() => {
                clearTimeout(DELAY_TIMER);
                reject('JSONP请求失败!');
            }, TIMEOUT);

            //=>成功或者失败后执行的函数
            window[FN_NAME] = function (result) {
                document.body.removeChild(SCRIPT);
                window[FN_NAME] = null;
                clearTimeout(DELAY_TIMER);
                resolve(result);
            };
        });
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = {
            jsonp
        };
    }

    window.jsonp = jsonp;
})(typeof window === 'undefined' ? global : window);

