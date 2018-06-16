class Promise {
    constructor(excutor) {
        this.status = 'pending';
        this.value = undefined;
        this.fulfilledAry = [];
        this.rejectedAry = [];

        //=>成功和失败执行的方法
        let resolve = result => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pending') return;
                this.status = 'fulfilled';
                this.value = result;
                this.fulfilledAry.forEach(item => item(result));
            }, 0);
        };

        let reject = reason => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pending') return;
                this.status = 'rejected';
                this.value = reason;
                this.rejectedAry.forEach(item => item(reason));
            }, 0);
        };

        //=>捕获异常信息
        try {
            excutor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    //=>THEN
    then(fulfilledCallBack, rejectedCallBack) {
        typeof fulfilledCallBack !== 'function' ? fulfilledCallBack = () => {
            return this.value;
        } : null;
        typeof rejectedCallBack !== 'function' ? rejectedCallBack = () => {
            throw new Error(this.value);
        } : null;

        return new Promise((resolve, reject) => {
            this.fulfilledAry.push(() => {
                try {
                    let x = fulfilledCallBack(this.value);
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x);
                } catch (e) {
                    reject(e);
                }
            });
            this.rejectedAry.push(() => {
                try {
                    let x = rejectedCallBack(this.value);
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    //=>CATCH
    catch(rejectedCallBack) {
        return this.then(null, rejectedCallBack);
    }

    //=>STATIC ALL
    static all(promiseAry) {
        return new Promise((resolve, reject) => {
            let resultAry = [],
                index = 0;
            for (let i = 0; i < promiseAry.length; i++) {
                promiseAry[i].then(result => {
                    index++;
                    resultAry[i] = result;
                    if (index === promiseAry.length) {
                        resolve(resultAry);
                    }
                }).catch(reason => {
                    reject(reason);
                });
            }
        });
    }
}

module.exports = Promise;