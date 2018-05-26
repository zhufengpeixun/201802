;(function anonymous(window) {
    //=>CREATE AJAX CLASS
    function ajax(options) {
        return new init(options);
    }

    //=>AJAX PROTOTYPE
    ajax.prototype = {
        constructor: ajax,
        check() {
            return this.url.indexOf('?') > -1 ? '&' : '?';
        },
        handleDataType(xhr) {
            let dataType = this.dataType.toUpperCase(),
                result = xhr.responseText;
            switch (dataType) {
                case 'TEXT':
                    break;
                case 'JSON':
                    result = JSON.parse(result);
                    break;
                case 'XML':
                    result = xhr.responseXML;
                    break;
            }
            return result;
        },
        handleData() {
            /*
             * 1.如果DATA传递的是一个对象,我们需要把它转换为X-WWW-FORM-URLENCODED这种字符串的格式（客户端传递给服务器端的内容一般都是这种格式，除此之外还有RAW等）
             * 2.如果是GET请求,我们需要把第一步解析后的结果放到URL的末尾,基于“问号传参传递过去”(如果是POST不需要管)
             */
            let {method, data} = this;
            if (!data) return;
            if (typeof data === 'object') {
                let str = ``;
                for (let attr in data) {
                    if (data.hasOwnProperty(attr)) {
                        str += `${attr}=${data[attr]}&`;
                    }
                }
                str = str.substring(0, str.length - 1);
                this.data = data = str;
            }
            if (_regGET.test(method)) {
                this.url += `${this.check()}${data}`;
                this.data = null;
            }
        },
        handleCache() {
            let {method, cache} = this;
            if (cache === false && _regGET.test(method)) {
                this.url += `${this.check()}_=${+(new Date())}`;
            }
        },
        getServerTime() {
            //...
        },
        send() {
            this.handleData();
            this.handleCache();

            //=>AJAX的四步操作
            let {method, url, async, data, success, error} = this,
                xhr = new XMLHttpRequest;
            xhr.open(method, url, async);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (/^(2|3)\d{2}$/.test(xhr.status)) {
                        //=>成功
                        let result = this.handleDataType(xhr);
                        success.call(this, result, xhr);
                    } else {
                        //=>失败
                        error.call(this, xhr.statusText, xhr);
                    }
                }
            };
            xhr.send(data);
        }
    };

    //=>INIT
    let _emptyFn = new Function(''),
        _regGET = /^(GET|DELETE|HEAD|TRACE|OPTIONS)$/i,
        _default = {
            url: '',
            method: 'GET',
            data: null,
            dataType: 'JSON',
            async: true,
            cache: true,
            success: _emptyFn,
            error: _emptyFn
        };

    function init(options) {
        //=>THIS:INIT的实例(相当于AJAX的实例)
        options = {..._default, ...options};//=>Object.assign(_default,options) ES6中新增的合并对象的方法
        for (let attr in options) {
            if (!options.hasOwnProperty(attr)) break;
            this[attr] = options[attr];
        }

        //=>SEND AJAX
        this.send();
    }

    //=>让INIT的实例等价于AJAX的实例
    init.prototype = ajax.prototype;

    window.ajax = ajax;
})(window);